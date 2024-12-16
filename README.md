# eslint-plugin-nestjs-pedantic

Nitpicky ESLint rules.

## Installation

```
npm install -D eslint typescript-eslint eslint-plugin-nestjs-pedantic
```

## Configuration

To use the recommended configuration:

```js
import nestjsPedantic from "eslint-plugin-nestjs-pedantic";

export default [
  // ...
  ...nestjsPedantic.configs.recommended,
];
```

To turn on every rule:

```js
import nestjsPedantic from "eslint-plugin-nestjs-pedantic";

export default [
  // ...
  ...nestjsPedantic.configs.all,
];
```

See more: [Configuring Plugins](https://eslint.org/docs/latest/use/configure/plugins).

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
🌐 Set in the `all` configuration.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                                                                                                    | Description                                    | 💼    | 🔧  | 💡  |
| :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :---- | :-- | :-- |
| [match-methods-to-routes](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/match-methods-to-routes)     | Match method names to the decorated API routes | 🌐 ✅ | 🔧  |     |
| [no-duplicate-route-params](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/no-duplicate-route-params) | Disallow duplicate route parameters            | 🌐 ✅ |     |     |
| [no-unused-route-params](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/no-unused-route-params)       | Disallow unused route parameters               | 🌐 ✅ |     | 💡  |
| [route-convention](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/route-convention)                   | Keep a convention when decorating routes       | 🌐 ✅ | 🔧  | 💡  |
| [safe-route-params](https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/safe-route-params)                 | Ensure safe usage of the `@Param` decorator    | 🌐 ✅ |     | 💡  |

<!-- end auto-generated rules list -->
