# Error Handling

LOGX throws descriptive errors for invalid arguments and never fails silently.

## Error types

| Situation | Error type |
|-----------|------------|
| Wrong argument type | `TypeError` |
| Value out of valid range | `RangeError` |

## Examples

```ts
import { chunk, clamp } from "@mwakidenis/logx";

chunk([1, 2], 0);       // RangeError: size must be a positive integer
clamp(5, 10, 0);        // RangeError: min must not be greater than max
get(null, "a.b");       // returns undefined (no throw)
```

## No unexpected mutation

LOGX does not mutate user-supplied arrays or objects unless explicitly documented.

## Async errors

Async functions (`sleep`, `retry`, `timeout`, `withTimeout`) reject with descriptive errors. `retry` throws the last error after exhausting retries. `timeout` rejects with a timeout error (customizable via the `error` option).
