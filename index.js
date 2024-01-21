/** @type {import("eslint").ESLint.Plugin} */
module.exports = {
  rules: require("./lib/rules"),
  configs: require("./lib/configs"),
};
