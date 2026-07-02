# Changelog

All notable changes to OpenCloud are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Change groups: **Added**, **Changed**, **Deprecated**, **Removed**, **Fixed**,
**Security**. Keep entries human-readable and link PRs/issues where useful. Add to
**[Unreleased]** as you work; move it under a version + date on release.

---

## [Unreleased]

### Added
- ADR 0003: **Cloudflare is the authoritative DNS and ingress path** — customer
  zones managed via the Cloudflare API by the provisioner; inbound traffic via
  Cloudflare Tunnel (`cloudflared`), so self-hosted nodes work behind CGNAT
  without a static IP. BIND9 demoted to documented fallback. Docs updated:
  `ARCHITECTURE.md` (adds the self-hosted-first design goal), `CLAUDE.md`,
  `README.md`, `docs/HOSTING.md`, `docs/INFRASTRUCTURE.md`, `ROADMAP.md`.
- ADR 0004: launch scope for services that can't be self-hosted — email
  deferred until a clean-IP mail path exists, domains are bring-your-own,
  payments start as manual bank transfer (gateway lands in Phase 5).
- Approved supporting libraries recorded in the stack: Go — `golang-jwt/jwt/v5`,
  `x/crypto` (argon2id), `google/uuid`, `prometheus/client_golang`,
  `go-redis/redis_rate`, `testify` (`docs/BACKEND.md` §13); frontend (dashboard
  phase) — TanStack Query/Table, react-hook-form + zod, Recharts, Vitest +
  Testing Library (`docs/FRONTEND.md`, `docs/TESTING.md`).
- Roadmap: Hestia integration spike added to Phase 0; basic `pg_dump` backups
  moved from Phase 6 into Phase 2's exit criteria; usage metering pipeline made
  an explicit Phase 4 item so Phase 5 billing has historical data.
- `.env.example` with documented, non-secret defaults (referenced by README and
  `docs/INFRASTRUCTURE.md` but previously missing).
- CI workflow (`.github/workflows/ci.yml`): frontend lint, type-check, build,
  and dependency audit on every PR and push to `main`. Go jobs are added when
  the backend scaffold lands.
- Complete project documentation set: `README.md`, `CLAUDE.md`, `ARCHITECTURE.md`,
  `ROADMAP.md`, `CHANGELOG.md`, and `docs/` (backend, frontend, database, API,
  hosting, infrastructure, security, deployment, coding standards, testing, UI
  guidelines, contributing).
- Architecture Decision Records: `docs/adr/` with template and ADR 0001
  (Hestia as a provisioning backend).
- ADR 0002: the `jobs` table in PostgreSQL **is** the job queue (claimed via
  `FOR UPDATE SKIP LOCKED`); Redis no longer plays a queue role. Fixes the
  dual-write flaw where a Redis enqueue was not transactional with the
  PostgreSQL write that triggered it. Docs updated: `ARCHITECTURE.md`,
  `CLAUDE.md`, `docs/BACKEND.md`, `docs/DATABASE.md` (adds `jobs.run_at` +
  claim index), `docs/HOSTING.md`, `ROADMAP.md`.

### Changed
- GSAP (`@gsap/react`) and Geist fonts (`@fontsource`) — already in use by the
  landing page — are now part of the documented frontend stack (GSAP scoped to
  the marketing surface only).
- `package.json` name corrected from `frontend` to `opencloud`.
- `CLAUDE.md` restructured from a single large document into a concise contract +
  index that links to the detailed `docs/` topic files (single source of truth
  per topic).
- Frontend moved from `frontend/` to the **repo root** (`app/`, `src/`, `public/`,
  `package.json`, configs). Docs updated to match the new paths.

### Removed
- Legacy Vite frontend artifacts (`vite.config.ts`, `index.html`, `src/main.tsx`,
  `tsconfig.{app,node}.json`) superseded by the Next.js App Router (`app/`).
- Build/scratch artifacts (`.next/`, `dist/`, `output/`, `.playwright-cli/`,
  `verify-*.mjs`, `verify.png`) — now git-ignored, not committed.
- Remaining Vite scaffold leftovers: `src/assets/vite.svg`, `src/assets/react.svg`
  (unreferenced) and the empty `frontend/` directory.

---

## [0.0.0] — project inception

### Added
- Initial frontend scaffold and landing page.

---

[Unreleased]: https://example.com/opencloud/compare/v0.0.0...HEAD
[0.0.0]: https://example.com/opencloud/releases/tag/v0.0.0
