import { METHODS } from "http";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

export default (node: TSESTree.MethodDefinition) => {
  return node.decorators.find(
    (decorator) =>
      decorator.expression &&
      decorator.expression.type === AST_NODE_TYPES.CallExpression &&
      decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
      METHODS.includes(decorator.expression.callee.name.toUpperCase()),
  ) as
    | undefined
    | (TSESTree.Decorator & {
        expression: TSESTree.CallExpression & { callee: TSESTree.Identifier };
      });
};
