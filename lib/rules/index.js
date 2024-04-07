/** @type {NonNullable<import("eslint").ESLint.Plugin["rules"]>} */
module.exports = {
  "match-methods-to-routes": require("./match-methods-to-routes.js"),
  "route-convention": require("./route-convention.js"),
  "safe-route-params": require("./safe-route-params.js"),
  "no-unused-route-params": require("./no-unused-route-params.js"),
};
