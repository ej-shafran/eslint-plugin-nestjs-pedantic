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

