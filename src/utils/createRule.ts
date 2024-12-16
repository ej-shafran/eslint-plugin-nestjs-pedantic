import { ESLintUtils } from "@typescript-eslint/utils";

export interface NestJSPedanticPluginDocs {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}

export default ESLintUtils.RuleCreator<NestJSPedanticPluginDocs>(
  (ruleName) =>
    `https://github.com/ej-shafran/eslint-plugin-nestjs-pedantic/wiki/${ruleName}`,
);
