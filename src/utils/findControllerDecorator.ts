import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

export default (node: TSESTree.ClassDeclaration) => {
  return node.decorators.find(
    (decorator) =>
      decorator.expression.type === AST_NODE_TYPES.CallExpression &&
      decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
      decorator.expression.callee.name === "Controller",
  ) as
    | undefined
    | (TSESTree.Decorator & {
        expression: TSESTree.CallExpression & { callee: TSESTree.Identifier };
      });
};
