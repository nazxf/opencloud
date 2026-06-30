# ADR 0001: Hestia Control Panel as a provisioning backend, not a fork

- **Status:** Accepted
- **Date:** 2026-06-30
- **Deciders:** Core team

## Context

OpenCloud needs to provision and manage real hosting resources — websites, DNS
zones, databases, mailboxes, SSL certificates — across Linux nodes. Building that
stack ourselves (web server config, DNS server, mail, cert issuance, per-user
isolation) is years of work and a permanent security liability.

Hestia Control Panel already orchestrates Nginx, Apache, PHP-FPM, MariaDB, BIND9,
and Certbot with proven multi-tenant isolation. The options were:

1. Fork Hestia and bend its UI/DB into our product.
2. Build our own control plane and drive Hestia as a backend via its API/CLI.
3. Build everything from scratch.

## Decision

We will run **Hestia unmodified on each hosting node** and treat it as a
**provisioning backend**. The Go control plane is the system of record for
accounts, billing, and orchestration; it drives Hestia through a single
`provisioner` package (Hestia API + CLI). Customers never see Hestia directly.

## Consequences

**Easier:** we inherit a hardened, battle-tested hosting stack; we own the UX and
data model; node upgrades track upstream Hestia instead of a fork we maintain.

**Harder / accepted cost:** the control plane's state can drift from a node's
actual state, so the provisioner must be **idempotent** and reconcilable. All node
interaction is funnelled through one package (no ad-hoc SSH/CLI elsewhere), and we
depend on Hestia's API surface and release cadence.

Supersedes nothing. Future changes to the provisioning approach should supersede
this ADR rather than edit it.
