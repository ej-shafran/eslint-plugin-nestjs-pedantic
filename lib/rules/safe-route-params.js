const findParamDecorators = require("../utils/findParamDecorators");
const findHttpMethodDecorator = require("../utils/findHttpMethodDecorator");
const docsUrl = require("../utils/docsUrl");
const { AST_NODE_TYPES } = require("@typescript-eslint/utils");

const messages = /** @type {const}*/ ({
  invalidParamName: "Invalid param name for route `{{definition}}`",
  missingRouteDefinition: "Invalid call to `@Param` without a route definition",
  replaceWithOtherParam: 'Replace with `"{{otherParam}}"`',
});

/**
 * @type {import("@typescript-eslint/utils").TSESLint.RuleModule<keyof typeof messages>}
 **/
module.exports = {
  meta: {
    hasSuggestions: true,
    docs: {
      description: "Ensure safe usage of the `@Param` decorator",
      recommended: "recommended",
      url: docsUrl("safe-route-params"),
    },
    type: "suggestion",
    schema: [],
    messages,
    fixable: "code",
  },
  create(context) {
    return {
      MethodDefinition(node) {
        const routeDecorator = findHttpMethodDecorator(node);

        const paramDecorators = findParamDecorators(node);

        paramDecorators.forEach((paramDecorator) => {
          const firstArg = paramDecorator.expression.arguments[0];
          if (!firstArg || firstArg.type !== AST_NODE_TYPES.Literal) return;

          const paramName = firstArg.value;
          if (typeof paramName !== "string") return;

          if (!routeDecorator) {
            context.report({
              node: paramDecorator,
              messageId: "missingRouteDefinition",
            });
            return;
          }

          const routeFirstArg = routeDecorator.expression.arguments[0];
          if (!routeFirstArg || routeFirstArg.type !== AST_NODE_TYPES.Literal)
            return;
          const route = String(routeFirstArg?.value ?? "");

          if (!route.includes(`:${paramName}`)) {
            const routeParams = route
              .split("/")
              .filter((slug) => slug && slug.startsWith(":"))
              .map((param) => param.slice(1));

            context.report({
              node: paramDecorator.expression.arguments[0],
              messageId: "invalidParamName",
              data: {
                definition: context.sourceCode.getText(routeDecorator),
              },
              suggest: routeParams.map((param) => ({
                messageId: "replaceWithOtherParam",
                data: {
                  otherParam: param,
                },
                fix(fixer) {
                  return fixer.replaceText(
                    paramDecorator.expression.arguments[0],
                    '"' + param + '"',
                  );
                },
              })),
            });
          }
        });
      },
    };
  },
  defaultOptions: [],
};
