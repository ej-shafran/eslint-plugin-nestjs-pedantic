# Changelog

## 0.0.16

### Patch Changes

- 1203e6f: Fix TypeScript issue when using `defineConfig` from ESLint.
- 38032a4: Use correct `type` fields for rules, so that their severity is clearer:
  - `no-unused-route-params` is now a `suggestion`
  - `safe-route-params` is now a `problem`
  - `wrap-circular-dependencies` is now a `problem`

- 22adff0: Added the `no-mismatchd-forward-refs` rule, which is included in the `recommended` configuration.

## 0.0.15

### Patch Changes

- ad4eebd: Add `wrap-circular-dependencies` rule and `recommendedSwc` config.

## 0.0.14

### Patch Changes

- 54da0db: Fix `no-unused-route-params` for `@Param` calls with a non-string parameter

## 0.0.13

### Patch Changes

- e091445: Fix `safe-route-params` false negatives for `@Param` calls with a prefix of an existing route parameter.

## 0.0.12

### Patch Changes

- a2cc0fa: Fix types for index export, allowing users to import plugin in typed ESLint configs without errors.
- 2c5fbae: Bump `@typescript-eslint/utils`.

## 0.0.11

### Patch Changes

- 70527be: Bump `@typescript-eslint/utils`.

## 0.0.10

### Patch Changes

- 789541f: Make empty strings invalid for route convention.

## 0.0.9

### Patch Changes

- c253b0f: Fix regression with "no such file or directory".

## 0.0.8

### Patch Changes

- 2d3bd61: Fix "require is not defined in ES module scope".
- bb58d64: Provide proper types for default export.

## 0.0.7

### Patch Changes

- 4a8f2c8: Fix "no such file or directory" error.
- c176e19: Add type declarations to package.

## 0.0.6

### Patch Changes

- be93c57: Update CHANGELOG format.

## 0.0.5

### Patch Changes

- 8688197: Update to use ESLint v9.
