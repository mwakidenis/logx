# Performance

LOGX favors clear, maintainable implementations over premature micro-optimization. Benchmarks live in `benchmarks/` and are run with:

```bash
npm run benchmark
```

## Benchmark categories

- Small datasets (n ≈ 10)
- Medium datasets (n ≈ 1,000)
- Large datasets (n ≈ 10,000)
- Nested objects
- Memory-sensitive cases
- Repeated calls

## Performance philosophy

- Measure with reproducible tools; never publish fabricated results.
- Never claim LOGX is faster than another library without reproducible evidence.
- Optimize only where it meaningfully matters and does not harm maintainability.

## Interpreting results

Each benchmark reports total time and microseconds per operation. Use these as a baseline for detecting regressions in future changes.
