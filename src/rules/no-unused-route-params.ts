import createRule from "../utils/createRule.js";
import findHttpMethodDecorator from "../utils/findHttpMethodDecorator.js";
import findParamDecorators from "../utils/findParamDecorators.js";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const messages = {
  unusedRouteParam: "Unused route param `{{param}}`",
  removeRouteParam: "Remove unused route parameter `{{param}}`",
};

export default createRule({
  name: "no-unused-route-params",
  meta: {
    hasSuggestions: true,
    docs: {
      description: "Disallow unused route parameters",
      recommended: true,
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

        const slugs = paramName.split("/");

        const routeParams = slugs
          .filter((slug) => slug.startsWith(":"))
          .map((slug) => slug.slice(1));

        const paramDecorators = findParamDecorators(node);
        // Ignore routes that call `@Param()` without passing a specific param
        if (
          paramDecorators.some(
            (decorator) =>
              decorator.expression.arguments[0]?.type !==
              AST_NODE_TYPES.Literal,
          )
        )
          return;

        routeParams.forEach((param) => {
          if (
            paramDecorators.some((decorator) => {
              const firstArg = decorator.expression.arguments[0];
              if (!firstArg || firstArg.type !== AST_NODE_TYPES.Literal)
                return false;
              return firstArg.value === param;
            })
          )
            return;

          context.report({
            node: routeDecorator,
            messageId: "unusedRouteParam",
            data: {
              param,
            },
            suggest: [
              {
                messageId: "removeRouteParam",
                data: {
                  param,
                },
                fix(fixer) {
                  return fixer.replaceText(
                    routeDecorator.expression.arguments[0],
                    '"' +
                      slugs.filter((slug) => slug !== `:${param}`).join("/") +
                      '"',
                  );
                },
              },
            ],
          });
        });
      },
    };
  },
  defaultOptions: [],
});
