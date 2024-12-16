import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

export default (node: TSESTree.MethodDefinition) => {
  return node.value.params
    .flatMap((param) => param.decorators)
    .filter(
      (decorator) =>
        decorator.expression &&
        decorator.expression.type === AST_NODE_TYPES.CallExpression &&
        decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
        decorator.expression.callee.name === "Param",
    ) as (TSESTree.Decorator & {
    expression: TSESTree.CallExpression & { callee: TSESTree.Identifier };
  })[];
};
