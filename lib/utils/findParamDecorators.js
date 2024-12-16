import { AST_NODE_TYPES } from "@typescript-eslint/utils";

/**
 * @typedef {import("@typescript-eslint/utils").TSESTree.MethodDefinition} MethodDefinition
 * @typedef {import("@typescript-eslint/utils").TSESTree.Parameter} Parameter
 * @typedef {import("@typescript-eslint/utils").TSESTree.Decorator} Decorator
 * @typedef {import("@typescript-eslint/utils").TSESTree.CallExpression} CallExpression
 * @typedef {import("@typescript-eslint/utils").TSESTree.Identifier} Identifier
 **/

/**
 * @param {MethodDefinition} node
 **/
export default (node) => {
  return /** @type {(Decorator & { expression: CallExpression & { callee: Identifier } })[]} */ (
    node.value.params
      .flatMap((param) => param.decorators)
      .filter(
        (decorator) =>
          decorator.expression &&
          decorator.expression.type === AST_NODE_TYPES.CallExpression &&
          decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
          decorator.expression.callee.name === "Param",
      )
  );
};
