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
- Complete project documentation set: `README.md`, `CLAUDE.md`, `ARCHITECTURE.md`,
  `ROADMAP.md`, `CHANGELOG.md`, and `docs/` (backend, frontend, database, API,
  hosting, infrastructure, security, deployment, coding standards, testing, UI
  guidelines, contributing).
- Architecture Decision Records: `docs/adr/` with template and ADR 0001
  (Hestia as a provisioning backend).

### Changed
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

---

## [0.0.0] — project inception

### Added
- Initial frontend scaffold and landing page.

---

[Unreleased]: https://example.com/opencloud/compare/v0.0.0...HEAD
[0.0.0]: https://example.com/opencloud/releases/tag/v0.0.0
