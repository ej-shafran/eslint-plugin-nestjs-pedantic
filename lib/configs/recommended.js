module.exports = {
  ...require("./all"),
  rules: {
    "nestjs-pedantic/match-methods-to-routes": 2,
    "nestjs-pedantic/route-convention": 2,
    "nestjs-pedantic/safe-route-params": 2,
    "nestjs-pedantic/no-unused-route-params": 2,
    "nestjs-pedantic/no-duplicate-route-params": 2,
  },
};
