# Backend — Go Control Plane

The OpenCloud backend is a Go service that acts as the **system of record** and
orchestrates Hestia nodes. This document is the deep dive; the contract lives in
[`../CLAUDE.md`](../CLAUDE.md) and the system map in [`../ARCHITECTURE.md`](../ARCHITECTURE.md).

**Stack:** Go 1.22+ · Gin · Bun ORM · PostgreSQL · Redis · Viper · Zap.

---

## 1. Package layout

```
backend/
├── cmd/
│   ├── api/main.go        # HTTP server entrypoint
│   ├── worker/main.go     # background job worker entrypoint
│   └── migrate/main.go    # migration runner
├── internal/              # private; not importable by other modules
│   ├── config/            # Viper loading → typed Config struct
│   ├── server/            # router wiring + dependency injection
│   ├── handler/           # Gin handlers, one file per domain
│   ├── service/           # business logic + transactions
│   ├── repository/        # Bun data access, account-scoped
│   ├── model/             # domain structs + Bun models
│   ├── provisioner/       # Hestia API/CLI client (+ fake)
│   ├── middleware/        # auth, request-id, logging, recovery, ratelimit
│   ├── queue/             # Redis job queue + job handlers
│   ├── dto/               # request/response shapes
│   └── apperr/            # typed application errors
├── pkg/                   # genuinely reusable, import-safe packages
└── migrations/            # SQL migrations (timestamped)
```

`internal/` keeps the app private. `pkg/` is only for code that is safe to import
elsewhere — don't dump app logic there.

## 2. Layering rules

One-directional dependencies. See the diagram in [`../ARCHITECTURE.md`](../ARCHITECTURE.md#4-backend-layering).

| Layer | May call | Must NOT |
|---|---|---|
| handler | service | touch Bun, hold business logic |
| service | repository, provisioner, queue | import Gin, build SQL |
| repository | Bun / PostgreSQL | call services, ignore `account_id` |
| provisioner | Hestia API/CLI | be called by anything but a service |

A handler that needs data calls a service; a service that needs persistence calls
a repository. No shortcuts.

## 3. Entry points

- **`cmd/api`** — builds config → logger → DB pool → Redis → repositories →
  services → router, then serves HTTP with graceful shutdown on `SIGTERM`.
- **`cmd/worker`** — same wiring minus the HTTP server; consumes the Redis queue.
- **`cmd/migrate`** — runs Bun migrations (`up`, `down`, `status`).

Both `api` and `worker` share the same `internal/` code; they differ only in what
they start. This keeps business logic in one place.

```go
func main() {
    cfg := config.Load()                 // Viper, once
    log := logging.New(cfg)              // Zap
    db := database.Connect(cfg, log)     // Bun + pgx pool
    rdb := cache.Connect(cfg)            // Redis
    app := server.New(cfg, log, db, rdb) // wires repos → services → handlers
    app.Run()                            // graceful shutdown built in
}
```

## 4. Configuration (Viper)

- Loaded **once** at startup into a typed `Config` struct, then passed down via DI.
- Sources, in precedence: environment variables → `.env` (dev) → defaults.
- **Never** call `viper.Get*` deep in the code — pass the typed value.
- Required-but-missing secrets fail fast at boot.

```go
type Config struct {
    Env        string `mapstructure:"ENV"`
    HTTPAddr   string `mapstructure:"HTTP_ADDR"`
    DatabaseURL string `mapstructure:"DATABASE_URL"`
    RedisURL   string `mapstructure:"REDIS_URL"`
    JWTSecret  string `mapstructure:"JWT_SECRET"`
    Hestia     HestiaConfig
    LogLevel   string `mapstructure:"LOG_LEVEL"`
}
```

Full variable reference: [`INFRASTRUCTURE.md`](INFRASTRUCTURE.md).

## 5. HTTP layer (Gin)

- Routes are versioned under `/api/v1` and grouped by domain in `server/`.
- Middleware order: `recovery → request-id → logger → cors → ratelimit → auth`.
- Handlers **bind + validate** request DTOs (`binding` tags), call one service
  method, and map the result to the standard envelope. Nothing else.

```go
func (h *SiteHandler) Create(c *gin.Context) {
    var req dto.CreateSiteRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        respondError(c, apperr.Validation(err)); return
    }
    acct := middleware.AccountID(c)
    site, err := h.sites.Create(c.Request.Context(), acct, req)
    if err != nil { respondError(c, err); return }
    c.JSON(http.StatusAccepted, gin.H{"data": site})
}
```

API conventions (envelopes, status codes, pagination): [`API.md`](API.md).

## 6. Services

- Own **business rules** and **transactions**. The only layer that may span
  multiple repositories or call the provisioner/queue.
- Accept `context.Context` first and an explicit `accountID` — never read the
  account from a request object; the handler extracts it and passes it in.
- Multi-write operations run in a single `bun.Tx` so partial state never persists.

```go
func (s *SiteService) Create(ctx context.Context, acct uuid.UUID, req dto.CreateSiteRequest) (*model.Site, error) {
    return database.InTx(ctx, s.db, func(tx bun.Tx) (*model.Site, error) {
        site := model.NewSite(acct, req)
        if err := s.repo.Create(ctx, tx, site); err != nil { return nil, err }
        if err := s.queue.Enqueue(ctx, queue.ProvisionSite{SiteID: site.ID}); err != nil {
            return nil, err // tx rolls back; nothing was provisioned
        }
        return site, nil
    })
}
```

## 7. Repositories (Bun)

- The **only** place that touches the database.
- Every customer query is **scoped by `account_id`**. This is a security boundary.
- Return domain models; never return `*gin.Context` or leak Bun internals upward.
- Accept an optional `bun.IDB` so the same method works inside or outside a tx.

```go
func (r *SiteRepo) List(ctx context.Context, acct uuid.UUID, p Page) ([]model.Site, error) {
    var sites []model.Site
    err := r.db.NewSelect().Model(&sites).
        Where("account_id = ?", acct).          // never optional
        Order("created_at DESC").
        Limit(p.Limit).Offset(p.Offset).
        Scan(ctx)
    return sites, err
}
```

Schema, migrations, and indexing rules: [`DATABASE.md`](DATABASE.md).

## 8. Provisioner

- The **single gateway** to Hestia. Nothing else shells out to a node.
- **Idempotent:** re-running a step on an existing resource succeeds, not errors —
  this makes job retries and reconciliation safe.
- Defined behind an interface so services depend on the capability, not Hestia:

```go
type SiteProvisioner interface {
    CreateSite(ctx context.Context, node model.Node, spec SiteSpec) error
    DeleteSite(ctx context.Context, node model.Node, domain string) error
}
```

- A `fakeProvisioner` implements the interface for tests so we **never** provision
  against a real node in CI. Hosting flows: [`HOSTING.md`](HOSTING.md).

## 9. Async jobs (Redis queue)

- Anything that can exceed ~1s (provisioning, SSL, backups, email) is **enqueued**,
  not run inline. The handler returns `202` + a resource/job id to poll.
- Jobs are durable: a `jobs` row mirrors queue state for audit and recovery.
- The worker retries with backoff; after N failures it marks the job `failed` and
  enqueues compensating cleanup. No orphaned half-provisioned resources.

```go
type Job interface { Kind() string }
type ProvisionSite struct{ SiteID uuid.UUID }
func (ProvisionSite) Kind() string { return "provision_site" }
```

## 10. Error handling

- Errors flow **up** wrapped with context: `fmt.Errorf("create site %q: %w", domain, err)`.
- Known cases are typed in `internal/apperr` (`apperr.NotFound`, `apperr.Conflict`,
  `apperr.Validation`, `apperr.Forbidden`).
- A single `respondError` maps typed errors → HTTP status + envelope, so every
  endpoint behaves identically.
- **Never leak internals** (SQL, stack traces, Hestia output) to clients; log the
  detail, return a clean message + stable `code`. Full policy: [`API.md`](API.md#errors).

## 11. Logging (Zap)

- One structured JSON logger, configured at startup, injected via DI. No `fmt.Println`.
- Every line carries `request_id`; add `account_id`, `user_id`, `job_id` where relevant.
- Levels: `debug` (dev), `info` (lifecycle/business events), `warn` (degraded),
  `error` (needs a human).
- **Never log secrets.** Redact at the boundary. Metrics, not high-cardinality
  logs, carry trends — emit Prometheus metrics for rates/latency/counts.

## 12. Conventions

- `gofmt` + `golangci-lint` gate CI. See [`CODING_STANDARDS.md`](CODING_STANDARDS.md).
- `context.Context` is the first arg on anything doing I/O, with timeouts on every
  external call.
- Accept interfaces, return concrete types; define interfaces in the consumer.
- No global mutable state except the config and logger singletons.
- Tests: table-driven units with mocks; integration against a disposable Postgres.
  See [`TESTING.md`](TESTING.md).
