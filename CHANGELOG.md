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
