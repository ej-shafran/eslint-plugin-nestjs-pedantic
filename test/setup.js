const { RuleTester } = require("@typescript-eslint/rule-tester");

RuleTester.setDefaultConfig({
  parserOptions: { ecmaVersion: "latest" },
  parser: "@typescript-eslint/parser",
});

RuleTester.afterAll = () => {}
