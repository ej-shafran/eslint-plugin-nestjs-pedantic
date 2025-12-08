import { RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import createRule from "../utils/createRule.js";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const messages = {
  unwrappedCircularDependency:
    "This circular dependency should be wrapped in a generic type",
  wrapWithCircular: "Replace with `Circular<{{typeName}}>`",
} as const;

export default createRule({
  name: "wrap-circular-dependencies",
  meta: {
    hasSuggestions: true,
    fixable: "code",
    docs: {
      description:
        "Wrap circular dependencies to prevent SWC compilation issues",
    },
    type: "suggestion",
    schema: [],
    messages,
  },
  create(context) {
    return {
      Decorator(node) {
        let { parent } = node;
        const { expression } = node;

        if (expression.type !== AST_NODE_TYPES.CallExpression) return;

        if (
          expression.callee.type !== AST_NODE_TYPES.Identifier ||
          expression.callee.name !== "Inject"
        )
          return;

        const firstArgument = expression.arguments[0];
        if (
          !firstArgument ||
          firstArgument.type !== AST_NODE_TYPES.CallExpression
        )
          return;

        if (
          firstArgument.callee.type !== AST_NODE_TYPES.Identifier ||
          firstArgument.callee.name !== "forwardRef"
        )
          return;

        if (parent.type === AST_NODE_TYPES.TSParameterProperty) {
          parent = parent.parameter;
        }

        if (parent.type !== AST_NODE_TYPES.Identifier || !parent.typeAnnotation)
          return;

        const { typeAnnotation } = parent.typeAnnotation;
        if (
          typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference ||
          typeAnnotation.typeName.type !== AST_NODE_TYPES.Identifier ||
          typeAnnotation.typeArguments
        )
          return;

        const name = typeAnnotation.typeName.name;

        const fix = (fixer: RuleFixer) => {
          return fixer.replaceText(
            typeAnnotation.typeName,
            `Circular<${name}>`,
          );
        };

        context.report({
          node: typeAnnotation.typeName,
          messageId: "unwrappedCircularDependency",
          fix,
          suggest: [
            {
              messageId: "wrapWithCircular",
              data: { typeName: name },
              fix,
            },
          ],
        });
      },
    };
  },
  defaultOptions: [],
});
