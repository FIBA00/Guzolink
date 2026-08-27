# Guzolink REST API Integration Contract

The supplied task requires adapting the frontend to the existing Express/MongoDB API. No backend source or API specification was present in the workspace, so the frontend deliberately **does not hardcode unverified endpoints**. It instead uses the `VITE_API_*_PATH` environment variables declared in `.env.example`.

## Required mapping before production connection

| Resource | Frontend adapter | Required API details to verify |
| --- | --- | --- |
| Session and authentication | `client/src/services/apiResources.js` → `authApi` | Session route, cookie/CORS policy, login/registration request body, current-user response, logout method |
| Public products | `productsApi` | List query parameter names, pagination response, product identity, product image fields, variants, stock field |
| Public shops | `shopsApi` | Shop slug route, shop profile response, nested versus separate products route |
| Customer and merchant orders | `ordersApi` | Order create request body, payment initiation/result flow, permitted status changes, customer and merchant filtering |
| Merchant shop and customers | `merchantApi`, `shopsApi.update` | Merchant authorisation mechanism, editable fields, file upload/storage workflow, customer endpoint access |

## Implementation notes

The Axios client sends cookies by default, converts backend failures to a standard `ApiError`, and emits a session-expired event for `401` responses. TanStack Query owns fetched server data; the only persisted client state is the customer cart. Static preview data is enabled **only when `VITE_API_URL` is unset in development**, so a real configured API is never silently replaced in production.

> Do not expose private API credentials, payment secrets, or trust frontend route protection as the authorisation boundary. The Express API must enforce authentication and merchant permissions.
