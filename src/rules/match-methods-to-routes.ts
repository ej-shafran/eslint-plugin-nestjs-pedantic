import createRule from "../utils/createRule.js";
import findHttpMethodDecorator from "../utils/findHttpMethodDecorator.js";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

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
  renameMethod: "Rename to `{{expected}}`",
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
    hasSuggestions: true,
  },
  create(context) {
    return {
      MethodDefinition(node) {
        const decorator = findHttpMethodDecorator(node);
        if (!decorator) return;

        const received = node.key
          ? node.key.type === AST_NODE_TYPES.Identifier
            ? node.key.name
            : null
          : "";
        if (received === null) return;

        const httpMethod = decorator.expression.callee.name;

        const firstArg = decorator.expression.arguments[0];

        let route: string;

        if (!firstArg) {
          route = "";
        } else if (
          firstArg.type === AST_NODE_TYPES.Literal &&
          typeof firstArg.value === "string"
        ) {
          route = firstArg.value;
        } else if (firstArg.type === AST_NODE_TYPES.ArrayExpression) {
          const strings = firstArg.elements.filter(
            (element): element is TSESTree.Literal =>
              !!element &&
              element.type === AST_NODE_TYPES.Literal &&
              typeof element.value === "string",
          );

          if (strings.length === 0) return;

          route = strings.map((element) => element.value).join("/");
        } else {
          return;
        }

        const expected = getMethodName(httpMethod, route);

        if (received !== expected) {
          context.report({
            node: node.key,
            messageId: "matchMethodsToRoutes",
            data: {
              definition: context.sourceCode.getText(decorator),
              expected,
            },
            fix(fixer) {
              return fixer.replaceText(node.key, expected);
            },
            suggest: [
              {
                messageId: "renameMethod",
                data: { expected },
                fix(fixer) {
                  return fixer.replaceText(node.key, expected);
                },
              },
            ],
          });
        }
      },
    };
  },
  defaultOptions: [],
});
