import { METHODS } from "http";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

/**
 * @typedef {import("@typescript-eslint/utils").TSESTree.MethodDefinition} MethodDefinition
 * @typedef {import("@typescript-eslint/utils").TSESTree.Decorator} Decorator
 * @typedef {import("@typescript-eslint/utils").TSESTree.CallExpression} CallExpression
 * @typedef {import("@typescript-eslint/utils").TSESTree.Identifier} Identifier
 **/

/**
 * @param {MethodDefinition} node
 **/
export default (node) => {
  return /** @type {undefined | (Decorator & { expression: CallExpression & { callee: Identifier } })} */ (
    node.decorators.find(
      (decorator) =>
        decorator.expression &&
        decorator.expression.type === AST_NODE_TYPES.CallExpression &&
        decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
        METHODS.includes(decorator.expression.callee.name.toUpperCase()),
    )
  );
};
