# eslint-plugin-nestjs-pedantic

Nitpicky ESLint rules.

## Installation

```
npm install -D eslint typescript-eslint eslint-plugin-nestjs-pedantic
```

## Configuration

See more: [Configuring Plugins](https://eslint.org/docs/latest/use/configure/plugins).

### Recommended

To use the recommended configuration:

```js
import nestjsPedantic from "eslint-plugin-nestjs-pedantic";

export default [
  // ...
  ...nestjsPedantic.configs.recommended,
];
```

### SWC

If you use SWC to compile Nest (i.e. you use `--builder swc` or have `"builder": "swc"` in your `nest-cli.json`), use the recommended SWC configuration:

```js
import nestjsPedantic from "eslint-plugin-nestjs-pedantic";

export default [
  // ...
  ...nestjsPedantic.configs.recommendedSwc,
];
```

Make sure to

### All Rules

To turn on every rule:

```js
import nestjsPedantic from "eslint-plugin-nestjs-pedantic";

export default [
  // ...
  ...nestjsPedantic.configs.all,
];
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
🌐 Set in the `all` configuration.\
✅ Set in the `recommended` configuration.\
⚡ Set in the `recommendedSwc` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                                                                                                      | Description                                                                          | 💼       | 🔧  | 💡  |
| :------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- | :------- | :-- | :-- |
| [match-methods-to-routes](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/match-methods-to-routes)       | Match method names to the decorated API routes                                       | 🌐 ✅ ⚡ | 🔧  |     |
| [no-duplicate-route-params](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/no-duplicate-route-params)   | Disallow duplicate route parameters                                                  | 🌐 ✅ ⚡ |     |     |
| [no-mismatched-forward-refs](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/no-mismatched-forward-refs) | Ensure the type of any injected `forwardRef`s matches the actual forwarded reference | 🌐 ✅ ⚡ |     | 💡  |
| [no-unused-route-params](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/no-unused-route-params)         | Disallow unused route parameters                                                     | 🌐 ✅ ⚡ |     | 💡  |
| [route-convention](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/route-convention)                     | Keep a convention when decorating routes                                             | 🌐 ✅ ⚡ | 🔧  | 💡  |
| [safe-route-params](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/safe-route-params)                   | Ensure safe usage of the `@Param` decorator                                          | 🌐 ✅ ⚡ |     | 💡  |
| [wrap-circular-dependencies](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/wrap-circular-dependencies) | Wrap circular dependencies to prevent SWC compilation issues                         | 🌐 ⚡    | 🔧  | 💡  |

<!-- end auto-generated rules list -->

## TypeScript Setup for `Circular`

If you turn on the `wrap-circular-dependencies` rule and want the auto-fix (which uses a `Circular` type helper) to work, you'll need to setup your `tsconfig.json` to recognize it as a global type:

```jsonc
{
  // ...
  "compilerOptions": {
    // ...
    "types": [/* ... */ "eslint-plugin-nestjs-pedantic/circular"],
  },
}
```

Alternatively, you can define the type helper yourself in any `.d.ts` file which is included in your TypeScript project:

```ts
declare type Circular<T> = T;
```
