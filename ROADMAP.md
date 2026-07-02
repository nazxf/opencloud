# Roadmap

Phased delivery plan for OpenCloud. Each phase is shippable on its own and builds
on the last. Status legend: ✅ done · 🚧 in progress · ⏳ planned.

> This roadmap is directional, not a contract. Re-prioritize as reality demands,
> but keep it current — it's how the team and Claude know what's built.

---

## Current status

The frontend marketing/landing surface exists on the Next.js App Router at the
repo root (Vite fully removed). The Go backend, datastores, and provisioning are
greenfield. We are in **Phase 0 → Phase 1**.

---

## Phase 0 — Foundations 🚧

Stand up the skeleton everything else hangs off.

- ✅ Documentation set + conventions (`CLAUDE.md`, `docs/`)
- ✅ Frontend migration to Next.js App Router; legacy Vite artifacts removed
- ⏳ Go backend scaffold: `cmd/api`, `cmd/worker`, layered packages, config (Viper), logging (Zap)
- ⏳ PostgreSQL + Redis wired via Docker Compose
- ⏳ Bun migration tooling + initial schema (`accounts`, `users`)
- ⏳ Health/readiness endpoints + Prometheus metrics endpoint
- ⏳ CI: build, lint (`golangci-lint`, `oxlint`), test

**Exit criteria:** `docker compose up` brings up dashboard + API + datastores; a
user can register and log in.

## Phase 1 — Auth & accounts ⏳

- JWT access + refresh tokens (httpOnly cookies, Redis-backed rotation/revocation)
- RBAC (`customer`, `admin`) enforced in middleware
- Account + user management (signup, login, profile, password reset)
- Admin panel shell with role-gated routes
- Audit logging for sensitive actions
- Rate limiting on auth endpoints

**Exit criteria:** secure auth end to end; admin can see and manage users.

## Phase 2 — Provisioning core ⏳

The heart of the platform: drive Hestia.

- `provisioner` package: idempotent Hestia API/CLI client + fake for tests
- `nodes` registry + simple least-loaded placement
- Postgres-backed job queue (`jobs` table + `SKIP LOCKED`) + worker with
  retries/backoff and compensating cleanup
- Site lifecycle: create → active → suspend → delete (async, status-polled)
- Database lifecycle: MariaDB DB + user provisioning
- Reconciliation job: detect/repair control-plane ↔ node drift

**Exit criteria:** a customer can create and delete a working website from the
dashboard, backed by a real Hestia node.

## Phase 3 — Domains, DNS & SSL ⏳

- Domain management + linking to sites
- BIND9 DNS zone + record management through the provisioner
- Automatic Let's Encrypt issuance/renewal via Certbot
- DNS propagation + certificate status surfaced in the UI

**Exit criteria:** a customer can point a domain, get DNS + HTTPS, with renewals automated.

## Phase 4 — Email, FTP/SSH & cron ⏳

- Mailbox provisioning and management
- FTP/SSH account lifecycle
- Cron job management per account
- File usage and quota enforcement surfaced in the UI

## Phase 5 — Billing & plans ⏳

- Plans + subscriptions + entitlements
- Usage metering (disk, bandwidth) tied to plan limits
- Payment provider integration + invoices
- Suspension/dunning workflow on non-payment

## Phase 6 — Observability & ops ⏳

- Per-account resource dashboards in Grafana
- Alerting (node down, disk pressure, cert expiry, failed jobs)
- Node hardening automation (Fail2ban, UFW) as repeatable bootstrap
- Backups + restore runbooks
- Incident runbooks in `docs/runbooks/`

## Phase 7 — Scale & polish ⏳

- Multi-node scheduling improvements + node draining
- Read replicas for reporting
- Performance pass (caching, query tuning, bundle size)
- Accessibility audit (WCAG AA) across the dashboard
- Localization / i18n if required

---

## Longer-term ideas (unscheduled)

- Reseller accounts (sub-tenants under a customer)
- One-click app installers (WordPress, etc.)
- Staging environments / git-based deploys for customer sites
- Public API + API keys for power users
- Marketplace for add-ons

---

## How to update this file

When a milestone lands, flip its marker and add a line to
[`CHANGELOG.md`](CHANGELOG.md). When priorities shift, move items between phases
rather than deleting them — the history of intent is useful.
