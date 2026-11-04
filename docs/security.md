# Security

## Security helpers

- `secureCompare` — constant-time string comparison
- `secureRandom` — cryptographically secure random bytes (Node.js `crypto`)
- `secureRandomInt` — cryptographically secure random integers
- `escapeHtml` — HTML entity escaping

## Limitations

LOGX does **not**:

- Implement cryptographic algorithms
- Present encoding, hashing, or HTML escaping as complete security solutions
- Guarantee absolute security

Simple regular expressions (e.g. `isEmail`, `isURL`) do not guarantee validity in every real-world context.

## Reporting vulnerabilities

Do not open public issues for security vulnerabilities. Contact the maintainer, Mwaki Denis, through GitHub.

Reports are acknowledged within 5 business days. Fixes are released through the standard Changeset process.
