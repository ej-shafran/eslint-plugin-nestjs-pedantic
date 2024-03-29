const findControllerDecorator = require("../utils/findControllerDecorator");

const findHttpMethodDecorator = require("../utils/findHttpMethodDecorator");
const docsUrl = require("../utils/docsUrl");

const messages = /** @type {const}*/ ({
  noTrailingSlashes: "Route definition `{{definition}}` has trailing slashes",
  removeSlashes: "Remove trailing slashes",
});

const SLASHES_REGEX = /^\/|\/$/g;

/**
 * @param {NonNullable<ReturnType<typeof findHttpMethodDecorator>>} decorator
 * @param {import("@typescript-eslint/utils").TSESLint.RuleContext<keyof messages, []>} context
 **/
function checkDecorator(decorator, context) {
  const firstArg =
    /** @type {import("@typescript-eslint/utils").TSESTree.Literal | undefined} */
    (decorator.expression.arguments[0]);
  if (!firstArg) return;

  const route = firstArg.value;
  if (typeof route !== "string") return;

  /**
   * @param {import("@typescript-eslint/utils").TSESLint.RuleFixer} fixer
   **/
  function fix(fixer) {
    if (!firstArg || typeof route !== "string") return [];

    return fixer.replaceText(
      firstArg,
      '"' + route.replaceAll(SLASHES_REGEX, "") + '"',
    );
  }

  if (SLASHES_REGEX.test(route)) {
    context.report({
      node: firstArg,
      messageId: "noTrailingSlashes",
      data: {
        definition: context.sourceCode.getText(decorator),
      },
      fix,
      suggest: [
        {
          messageId: "removeSlashes",
          fix,
        },
      ],
    });
  }
}

/**
 * @type {import("@typescript-eslint/utils").TSESLint.RuleModule<keyof typeof messages>}
 **/
module.exports = {
  meta: {
    hasSuggestions: true,
    docs: {
      description: "Keep a convention when decorating routes",
      recommended: "recommended",
      url: docsUrl("route-conventions"),
    },
    type: "suggestion",
    schema: [],
    messages,
    fixable: "code",
  },
  create(context) {
    return {
      ClassDeclaration(node) {
        const decorator = findControllerDecorator(node);
        if (!decorator) return;
        checkDecorator(decorator, context);
      },
      MethodDefinition(node) {
        const decorator = findHttpMethodDecorator(node);
        if (!decorator) return;
        checkDecorator(decorator, context);
      },
    };
  },
  defaultOptions: [],
};
