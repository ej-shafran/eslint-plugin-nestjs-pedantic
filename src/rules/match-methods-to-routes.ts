import createRule from "../utils/createRule.js";
import findHttpMethodDecorator from "../utils/findHttpMethodDecorator.js";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const LETTER_REGEX = /^[A-Za-z]$/;

function toPascalCase(s: string) {
  let out = "";
  let capitalize = true;
  for (let i = 0; i < s.length; i++) {
    if (!LETTER_REGEX.test(s[i])) {
      capitalize = true;
    } else if (capitalize) {
      out += s[i].toUpperCase();
      capitalize = false;
    } else {
      out += s[i];
    }
  }
  return out;
}

function getMethodName(httpMethod: string, route: string) {
  return (
    httpMethod.toLowerCase() +
    route
      .split("/")
      .filter(Boolean)
      .map((slug) =>
        slug.startsWith(":")
          ? "By" + toPascalCase(slug.slice(1))
          : toPascalCase(slug),
      )
      .join("")
  );
}

const messages = {
  matchMethodsToRoutes:
    "This method should be `{{expected}}` to match `{{definition}}`",
} as const;

export default createRule({
  name: "match-methods-to-routes",
  meta: {
    docs: {
      description: "Match method names to the decorated API routes",
      recommended: true,
    },
    type: "suggestion",
    schema: [],
    messages,
    fixable: "code",
  },
  create(context) {
    return {
      MethodDefinition(node) {
        const decorator = findHttpMethodDecorator(node);
        if (!decorator) return;

        const recieved = node.key
          ? node.key.type === AST_NODE_TYPES.Identifier
            ? node.key.name
            : null
          : "";
        if (recieved === null) return;

        const httpMethod = decorator.expression.callee.name;

        const firstArg = decorator.expression.arguments[0];
        // TODO: handle array argument to `@Get()`, etc.
        if (firstArg && firstArg.type !== AST_NODE_TYPES.Literal) return;

        const route = firstArg?.value ?? "";
        if (typeof route !== "string") return;

        const expected = getMethodName(httpMethod, route);

        if (recieved !== expected) {
          context.report({
            node: node.key,
            messageId: "matchMethodsToRoutes",
            data: {
              definition: context.sourceCode.getText(decorator),
              expected,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
