# Contributing to LOGX

Thank you for considering a contribution to LOGX. LOGX is maintained by Mwaki Denis.

## How to contribute

1. Fork the repository and create a feature branch from `main`.
2. Install dependencies: `npm install`.
3. Implement your change with tests. Every public function must have unit tests.
4. Run `npm run typecheck`, `npm run lint`, `npm run test:coverage`, and `npm run build`.
5. Add a changeset: `npx changeset`.
6. Open a pull request against `main`.

## Coding conventions

- TypeScript with `strict` enabled. Avoid `any`.
- Prettier formatting. Run `npm run format` before committing.
- Original implementations only. Do not copy code from other libraries.
- No mutation of user input unless explicitly documented.
- JSDoc comments on every public export.

## Test requirements

- Normal, empty, invalid, boundary, null/undefined, mutation, and asynchronous rejection cases.
- Deterministic tests; mock randomness and timers.
- Target 90% statement and branch coverage.

## Release process

Releases are managed with Changesets. Maintainers publish to npm after review.

## Code of conduct

See `CODE_OF_CONDUCT.md`.

## Security

See `SECURITY.md` for vulnerability disclosure.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
