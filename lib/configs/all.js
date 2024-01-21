const allRules = require("../rules");

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: ["nestjs-pedantic"],
  rules: Object.fromEntries(
    Object.keys(allRules).map((key) => [`nestjs-pedantic/${key}`, 2]),
  ),
};
