import createRule from "../utils/createRule.js";
import findParamDecorators from "../utils/findParamDecorators.js";
import findHttpMethodDecorator from "../utils/findHttpMethodDecorator.js";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const messages = {
  invalidParamName: "Invalid param name for route `{{definition}}`",
  missingRouteDefinition: "Invalid call to `@Param` without a route definition",
  replaceWithOtherParam: 'Replace with `"{{otherParam}}"`',
} as const;

export default createRule({
  name: "safe-route-params",
  meta: {
    hasSuggestions: true,
    docs: {
      description: "Ensure safe usage of the `@Param` decorator",
    },
    type: "suggestion",
    schema: [],
    messages,
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
});
