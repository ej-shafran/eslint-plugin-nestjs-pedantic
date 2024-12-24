import { RuleContext, RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import createRule from "../utils/createRule.js";
import findControllerDecorator from "../utils/findControllerDecorator.js";
import findHttpMethodDecorator from "../utils/findHttpMethodDecorator.js";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const messages = {
  noTrailingSlashes: "Route definition `{{definition}}` has trailing slashes",
  removeSlashes: "Remove trailing slashes",
  noEmptyRouteString: "Route definition `{{definition}}` is an empty string",
  removeEmptyRouteString: "Remove empty route string",
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

  function slashesFix(fixer: RuleFixer) {
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
      fix: slashesFix,
      suggest: [
        {
          messageId: "removeSlashes",
          fix: slashesFix,
        },
      ],
    });
  }

  function emptyStringFix(fixer: RuleFixer) {
    return fixer.remove(firstArg);
  }

  if (route === "") {
    context.report({
      node: firstArg,
      messageId: "noEmptyRouteString",
      data: {
        definition: context.sourceCode.getText(decorator),
      },
      fix: emptyStringFix,
      suggest: [{ messageId: "removeEmptyRouteString", fix: emptyStringFix }],
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
