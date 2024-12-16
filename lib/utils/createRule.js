import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator(
  (ruleName) =>
    `https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/${ruleName}`,
);
