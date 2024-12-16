import tseslint from "typescript-eslint";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import n from "eslint-plugin-n";
import globals from "globals";
import js from "@eslint/js";

export default tseslint.config(js.configs.recommended, {
  plugins: {
    "eslint-plugin": eslintPlugin,
    n,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.commonjs,
      ...globals.node,
    },

    ecmaVersion: "latest",
  },

  rules: {
    "n/exports-style": ["error", "module.exports"],
  },
});
