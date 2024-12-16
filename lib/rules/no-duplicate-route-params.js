import createRule from "../utils/createRule.js";
import findHttpMethodDecorator from "../utils/findHttpMethodDecorator.js";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const messages = {
  duplicateRouteParam: "Duplicate route param `{{param}}`",
};

export default createRule({
  name: "no-duplicate-route-params",
  meta: {
    docs: {
      description: "Disallow duplicate route parameters",
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
  defaultOptions: [],
});
