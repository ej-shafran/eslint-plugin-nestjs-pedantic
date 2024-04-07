const findHttpMethodDecorator = require("../utils/findHttpMethodDecorator");
const docsUrl = require("../utils/docsUrl");
const { AST_NODE_TYPES } = require("@typescript-eslint/utils");

const messages = {
  duplicateRouteParam: "Duplicate route param `{{param}}`",
};

/**
 * @type {import("@typescript-eslint/utils").TSESLint.RuleModule<keyof typeof messages>}
 **/
module.exports = {
  meta: {
    docs: {
      description: "Disallow duplicate route parameters",
      recommended: "recommended",
      url: docsUrl("no-duplicate-route-params"),
    },
    type: "problem",
    schema: [],
    messages,
  },
  create(context) {
    return {
      MethodDefinition(node) {
        const routeDecorator = findHttpMethodDecorator(node);

        if (!routeDecorator) return;

        const firstArg = routeDecorator.expression.arguments[0];
        if (!firstArg || firstArg.type !== AST_NODE_TYPES.Literal) return;

        const paramName = firstArg.value;
        if (typeof paramName !== "string") return;

        const routeParams = paramName
          .split("/")
          .filter((slug) => slug.startsWith(":"))
          .map((slug) => slug.slice(1));

        /** @type {string[]} */
        const acc = [];
        routeParams.forEach((param) => {
          if (acc.includes(param)) {
            context.report({
              node: routeDecorator.expression,
              messageId: "duplicateRouteParam",
              data: {
                param,
              },
            });
            return;
          }

          acc.push(param);
        });
      },
    };
  },
};
