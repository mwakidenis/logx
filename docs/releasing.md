# Releasing

LOGX releases are managed with Changesets and published to npm by the maintainer.

## Steps

1. Ensure all quality gates pass: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`
2. Add a changeset: `npx changeset`
3. Commit the changeset
4. Maintainer runs `npx changeset version` to create release PRs
5. After review and merge, publish: `npm publish` (requires maintainer access)

## Who can publish

Only the project maintainer, Mwaki Denis, may publish to npm.

## Do not

- Publish unreviewed pull requests automatically
- Commit secrets or credentials
- Push version `1.0.0` merely because a build succeeds
