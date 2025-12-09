---
"eslint-plugin-nestjs-pedantic": patch
---

Use correct `type` fields for rules, so that their severity is clearer:

- `no-unused-route-params` is now a `suggestion`
- `safe-route-params` is now a `problem`
- `wrap-circular-dependencies` is now a `problem`
