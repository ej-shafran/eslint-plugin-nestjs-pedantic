import fs from "fs";

import matchMethodsToRoutes from "./rules/match-methods-to-routes.js";
import routeConvention from "./rules/route-convention.js";
import safeRouteParams from "./rules/safe-route-params.js";
import noUnusedRouteParams from "./rules/no-unused-route-params.js";
import noDuplicateRouteParams from "./rules/no-duplicate-route-params.js";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
) as typeof import("../package.json");

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  configs: {},
  rules: {
    "match-methods-to-routes": matchMethodsToRoutes,
    "route-convention": routeConvention,
    "safe-route-params": safeRouteParams,
    "no-unused-route-params": noUnusedRouteParams,
    "no-duplicate-route-params": noDuplicateRouteParams,
  },
  processors: {},
};

const plugins = {
  "nestjs-pedantic": plugin,
};

Object.assign(plugin.configs, {
  recommended: {
    plugins,
    rules: {
      "nestjs-pedantic/match-methods-to-routes": "error",
      "nestjs-pedantic/route-convention": "error",
      "nestjs-pedantic/safe-route-params": "error",
      "nestjs-pedantic/no-unused-route-params": "error",
      "nestjs-pedantic/no-duplicate-route-params": "error",
    },
  },
  all: {
    plugins,
    rules: Object.fromEntries(
      Object.keys(plugin.rules).map((key) => [
        `nestjs-pedantic/${key}`,
        "error",
      ]),
    ),
  },
});

export default plugin;
