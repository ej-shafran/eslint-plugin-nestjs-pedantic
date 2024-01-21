const findHttpMethodDecorator = require("../utils/findHttpMethodDecorator");
const docsUrl = require("../utils/docsUrl");

const { AST_NODE_TYPES } = require("@typescript-eslint/utils");

const LETTER_REGEX = /^[A-Za-z]$/;

/**
 * @param {string} s
 **/
function toPascalCase(s) {
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

/**
 * @param {string} route
 * @param {string} httpMethod
 **/
function getMethodName(httpMethod, route) {
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

const messages = /** @type {const}*/ ({
  matchMethodsToRoutes:
    "This method should be `{{expected}}` to match `{{definition}}`",
});

/**
 * @type {import("@typescript-eslint/utils").TSESLint.RuleModule<keyof typeof messages>}
 **/
module.exports = {
  meta: {
    docs: {
      description: "Match method names to the decorated API routes",
      recommended: "recommended",
      url: docsUrl("match-methods-to-routes"),
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
        const route =
          /** @type {import("@typescript-eslint/utils").TSESTree.Literal | undefined} */ (
            decorator.expression.arguments[0]
          )?.value ?? "";
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
};
