# ADR 0004: External services at launch — email, domains, payments

- **Status:** Accepted
- **Date:** 2026-07-02
- **Deciders:** Core team

## Context

Three hosting-platform staples cannot be fully self-hosted, each for a different
reason: mail sent from a residential IP is undeliverable by design (Spamhaus PBL,
no reverse DNS, port 25 blocked); selling domains requires ICANN accreditation or
a reseller agreement; processing card/VA payments requires a licensed provider.
Leaving these open would leak into schema and API design, so the launch scope is
fixed now.

## Decision

| Service | At launch | Later |
|---|---|---|
| **Email hosting** | Deferred — no mailboxes. Mail is never sent from residential IPs. | Phase 4, gated on a clean-IP mail path: a small VPS mail node/relay with proper PTR, SPF, DKIM, DMARC. |
| **Domain registration** | **Bring your own domain** — customers buy elsewhere and point nameservers at the platform ([ADR 0003](0003-cloudflare-dns-and-ingress.md)). | Reseller-registrar API integration (unscheduled — see ROADMAP). |
| **Payments** | Manual bank transfer + admin confirmation. | Payment gateway (Midtrans/Xendit/Stripe class) in Phase 5. |

## Consequences

**Easier:** launch scope shrinks to what the platform actually controls; no IP
reputation liability; no registrar or payment compliance surface on day one.

**Harder / accepted cost:** "no email yet" and "manual payment" are visible
product gaps versus incumbents — the dashboard must set expectations clearly.
The schema still models `mailboxes`, `subscriptions`, and invoices so the
deferred features land without migration churn.
