# Guzolink Finalization Backlog

## Completed Frontend Preview Surfaces

| Area | Delivered client capability | Live dependency remaining |
|---|---|---|
| Data layer | Central Axios adapter map and TanStack Query caches with preview fallback and mutation boundaries for marketplace, account, merchant, admin, checkout, content, support, and growth data. | Final endpoint paths, response contracts, pagination, and backend error codes. |
| Customer commerce | Marketplace, product/shop discovery, saved goods, account profile, addresses, preferences, cached delivery options, checkout review, order history, and mock payment outcomes. | Customer account, delivery, cart/order, payment, and refund APIs. |
| Merchant and admin | Product/shop media management, storefront publication, admin approval/rejection, merchant operations for inventory, fulfilment, shop team, and payouts. | Ownership/role enforcement, inventory, governance, fulfilment, team, payout, and audit APIs. |
| Support and content | Help centre, support intake, merchant onboarding guide, commerce-policy pages, and visible support/growth controls. | CMS/support workflow, approved legal content, and service-level processes. |
| Trust and experience | Notification centre, language selector, focus states, reduced-motion support, offline/update status, responsive layouts, and tested sidebar/modal interactions. | Reviewed Amharic production content, notification delivery, analytics consent service, and real-device accessibility audit. |

## Frontend Work Remaining Before Live Launch

| Priority | Remaining client work | Completion definition |
|---|---|---|
| P0 | Production content localization | Replace preview English copy with reviewed English/Amharic CMS content for every label, validation message, policy, notification, status, and help article. |
| P0 | Final API configuration | Populate the `VITE_API_*_PATH` variables and verify every query/mutation against the real REST contract; disable preview fallback in production. |
| P1 | End-to-end customer journeys | Add browser coverage for shopping, checkout, payment callback, fulfilment, cancellation/refund, address/account updates, and notification preferences. |
| P1 | Accessibility acceptance | Run keyboard, screen-reader, contrast, low-bandwidth, and real-device verification in both interface languages. |
| P2 | Frontend performance/SEO | Complete cache policy, image optimization, deferred loading, metadata, structured data, sitemap, and Core Web Vitals checks. |

## Server-Side and Shared Release Work

| Priority | Remaining work | Completion definition |
|---|---|---|
| P0 | REST API, database, and authorization | Persist and protect users, shops, products/variants, media, carts, orders, payment attempts, activities, preferences, merchant memberships, and admin decisions. |
| P0 | Real payment and fulfilment | Add payment-session creation, signed webhooks, idempotency, reconciliation, delivery zones/fees/timeslots, order transitions, cancellation, refunds, and invoices. |
| P0 | Media and notifications | Harden S3 validation/metadata/deletion and ship server-side activity persistence plus email/SMS/push delivery preferences. |
| P1 | Governance, analytics, and support services | Add reviewer history/evidence, resubmission/appeals, moderation, search, exports, payouts, analytics, support ticket ownership, and merchant success operations. |
| P1 | Security and operations | Deliver staging/production separation, input validation, rate limits, CSRF/security headers, logs, monitoring, backups, alerting, CI, rollback runbooks, and dependency review. |
| P1 | Legal/compliance approval | Obtain professional review and approved publication of terms, privacy, merchant, returns, prohibited-goods, cookie/consent, and applicable local commerce/tax policies. |

> **Recommended next step:** connect the REST/data contract first. It unlocks the already-built client routes without changing their components. Payment webhooks, authorization, and media hardening should follow before public commerce is enabled.
