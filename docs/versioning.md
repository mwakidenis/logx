# Versioning

LOGX follows [Semantic Versioning](https://semver.org/) (SemVer).

## Version scheme

`MAJOR.MINOR.PATCH`

- `MAJOR` — breaking API changes
- `MINOR` — new features, backward compatible
- `PATCH` — bug fixes, backward compatible

## Current version

`0.1.0` — initial development release. APIs may change before `1.0.0`.

## Release process

Releases are managed with [Changesets](https://changesets.github.io/):

1. Contributors add a changeset: `npx changeset`
2. Maintainer runs `npx changeset version` to bump versions and update changelogs
3. Maintainer publishes to npm

## Pre-1.0.0 policy

During `0.x.x`, minor versions may include breaking changes. `1.0.0` marks the first stable API.
