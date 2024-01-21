# eslint-plugin-nestjs-pedantic

Nitpicky ESLint rules.

## Installation

```
npm install -D eslint eslint-plugin-nestjs-pedantic
```

## Configuration

### Old (`.eslintrc.*`)

```js
module.exports = {
  // ...
  plugins: [
    // ...
    "nestjs-pedantic",
  ],
  extends: [
    // ...
    "nestjs-pedantic/recommended",
  ],
};
```

## New (`eslint.config.js`)

Either use one of the configs in `eslint-plugin-nestjs-pedantic/lib/configs` or import the plugin as a standalone from `eslint-plugin-nestjs-pedantic`.

```js
const nestjsPedanticRecommended = require("eslint-plugin-nestjs-pedantic/lib/configs/recommended");

module.exports = {
  // ...
  ...nestjsPedanticRecommended,
};
```

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
🌐 Set in the `all` configuration.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                                             | Description                                    | 💼    | 🔧  | 💡  |
| :--------------------------------------------------------------- | :--------------------------------------------- | :---- | :-- | :-- |
| [match-methods-to-routes](docs/rules/match-methods-to-routes.md) | Match method names to the decorated API routes | 🌐 ✅ | 🔧  |     |
| [route-convention](docs/rules/route-convention.md)               | Keep a convention when decorating routes       | 🌐 ✅ | 🔧  | 💡  |
| [safe-route-params](docs/rules/safe-route-params.md)             | Ensure safe usage of the `@Param` decorator    | 🌐    | 🔧  | 💡  |

<!-- end auto-generated rules list -->
