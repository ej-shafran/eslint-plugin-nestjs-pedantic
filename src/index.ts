import fs from "fs";

import { TSESLint } from "@typescript-eslint/utils";
import matchMethodsToRoutes from "./rules/match-methods-to-routes.js";
import routeConvention from "./rules/route-convention.js";
import safeRouteParams from "./rules/safe-route-params.js";
import noUnusedRouteParams from "./rules/no-unused-route-params.js";
import noDuplicateRouteParams from "./rules/no-duplicate-route-params.js";
import wrapCircularDependencies from "./rules/wrap-circular-dependencies.js";

const pkg = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as typeof import("../package.json");

const rules = {
  "match-methods-to-routes": matchMethodsToRoutes,
  "route-convention": routeConvention,
  "safe-route-params": safeRouteParams,
  "no-unused-route-params": noUnusedRouteParams,
  "no-duplicate-route-params": noDuplicateRouteParams,
  "wrap-circular-dependencies": wrapCircularDependencies,
};

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  configs: {
    get recommended() {
      return recommended;
    },
    get recommendedSwc() {
      return recommendedSwc;
    },
    get all() {
      return all;
    },
  },
  rules,
  processors: {},
} satisfies TSESLint.FlatConfig.Plugin;

const recommended: TSESLint.FlatConfig.Config = {
  plugins: {
    "nestjs-pedantic": plugin,
  },
  rules: {
    "nestjs-pedantic/match-methods-to-routes": "error",
    "nestjs-pedantic/route-convention": "error",
    "nestjs-pedantic/safe-route-params": "error",
    "nestjs-pedantic/no-unused-route-params": "error",
    "nestjs-pedantic/no-duplicate-route-params": "error",
  },
};

const recommendedSwc: TSESLint.FlatConfig.Config = {
  ...recommended,
  rules: {
    ...recommended.rules,
    "nestjs-pedantic/wrap-circular-dependencies": "error",
  },
};

const all: TSESLint.FlatConfig.Config = {
  plugins: {
    "nestjs-pedantic": plugin,
  },
  rules: Object.fromEntries(
    Object.keys(rules).map((key) => [`nestjs-pedantic/${key}`, "error"]),
  ),
};

export default plugin;
