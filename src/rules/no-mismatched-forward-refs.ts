import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import createRule from "../utils/createRule.js";
import getForwardRefIdentifier from "../utils/getForwardRefIdentifier.js";
import { RuleFixer } from "@typescript-eslint/utils/ts-eslint";

const messages = {
  mismatchedForwardRef:
    "The type of this injected dependency doesn't match the returned value from `forwardRef`",
  replaceForwardedRef:
    "Replace the forwarded ref (`{{forwardedRef}}`) with `{{annotatedType}}`",
  replaceAnnotatedType:
    "Replace the annotated type (`{{annotatedType}}`) with `{{forwardedRef}}`",
} as const;

export default createRule({
  name: "no-mismatched-forward-refs",
  meta: {
    hasSuggestions: true,
    docs: {
      description:
        "Ensure the type of any injected `forwardRef`s matches the actual forwarded reference",
    },
    type: "problem",
    schema: [],
    messages,
  },
  create(context) {
    return {
      Decorator(node) {
        const forwardedRef = getForwardRefIdentifier(node);
        if (!forwardedRef) return;

        let { parent } = node;
        if (parent.type === AST_NODE_TYPES.TSParameterProperty) {
          parent = parent.parameter;
        }

        if (parent.type !== AST_NODE_TYPES.Identifier || !parent.typeAnnotation)
          return;

        const { typeAnnotation } = parent.typeAnnotation;

        if (
          typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference ||
          typeAnnotation.typeName.type !== AST_NODE_TYPES.Identifier ||
          typeAnnotation.typeName.name === forwardedRef.name
        )
          return;

        if (
          typeAnnotation.typeArguments &&
          typeAnnotation.typeArguments.params.every(
            (param) =>
              param.type === AST_NODE_TYPES.TSTypeReference &&
              param.typeName.type === AST_NODE_TYPES.Identifier &&
              param.typeName.name === forwardedRef.name,
          )
        )
          return;

        const data = {
          annotatedType: context.sourceCode.getText(typeAnnotation),
          forwardedRef: forwardedRef.name,
        };

        context.report({
          node,
          messageId: "mismatchedForwardRef",
          suggest: [
            ...(!typeAnnotation.typeArguments?.params.length
              ? [
                  {
                    messageId: "replaceForwardedRef" as const,
                    data,
                    fix(fixer: RuleFixer) {
                      return [
                        fixer.replaceText(forwardedRef, data.annotatedType),
                      ];
                    },
                  },
                ]
              : []),
            {
              messageId: "replaceAnnotatedType",
              data,
              fix(fixer) {
                return [fixer.replaceText(typeAnnotation, data.forwardedRef)];
              },
            },
          ],
        });
      },
    };
  },
  defaultOptions: [],
});
