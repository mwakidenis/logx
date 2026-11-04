# Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full contributing guide.

## Quick summary

1. Fork and create a feature branch from `main`
2. Implement with tests
3. Run quality gates: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`
4. Add a changeset: `npx changeset`
5. Open a pull request against `main`

## Coding conventions

- TypeScript with `strict` enabled
- Prettier formatting
- Original implementations only
- No input mutation unless documented
- JSDoc on every public export
