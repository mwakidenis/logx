# Browser Support

LOGX works in modern browsers and Node.js. The `browser` and `security` modules detect the runtime at call time (not module load time) and degrade gracefully when browser APIs are unavailable.

## Browser-specific APIs

| Helper | Behavior when unavailable |
|--------|---------------------------|
| `safeStorage` | Returns safe no-op helpers |
| `localStorageHelpers()` | Returns `null` if `localStorage` is missing |
| `sessionStorageHelpers()` | Returns `null` if `sessionStorage` is missing |
| `getCookie` / `setCookie` / `removeCookie` | No-op without `document` |
| `isBrowser` / `isNode` | Boolean environment flags |

## Private browsing

In private browsing modes, `localStorage`/`sessionStorage` may throw on `setItem`. `safeStorage` catches these exceptions and returns safe no-ops.

## No module-load side effects

Browser globals (`window`, `document`, `localStorage`) are never accessed during module initialization. All access happens inside function bodies, so LOGX can be imported in Node.js without errors.

## Supported environments

- Chrome, Edge, Firefox, Safari (current and previous versions)
- Node.js >= 20
