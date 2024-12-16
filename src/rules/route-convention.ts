import { RuleContext, RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import createRule from "../utils/createRule.js";
import findControllerDecorator from "../utils/findControllerDecorator.js";
import findHttpMethodDecorator from "../utils/findHttpMethodDecorator.js";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const messages = {
  noTrailingSlashes: "Route definition `{{definition}}` has trailing slashes",
  removeSlashes: "Remove trailing slashes",
} as const;

const SLASHES_REGEX = /^\/|\/$/g;

function checkDecorator(
  decorator: NonNullable<ReturnType<typeof findHttpMethodDecorator>>,
  context: Readonly<RuleContext<keyof typeof messages, never[]>>,
) {
  const firstArg = decorator.expression.arguments[0];
  if (!firstArg || firstArg.type !== AST_NODE_TYPES.Literal) return;

  const route = firstArg.value;
  if (typeof route !== "string") return;

  function fix(fixer: RuleFixer) {
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

export default createRule({
  name: "route-convention",
  meta: {
    hasSuggestions: true,
    docs: {
      description: "Keep a convention when decorating routes",
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
});
