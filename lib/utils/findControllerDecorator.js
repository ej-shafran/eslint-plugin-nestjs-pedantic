const { AST_NODE_TYPES } = require("@typescript-eslint/utils");

/**
 * @typedef {import("@typescript-eslint/utils").TSESTree.ClassDeclaration} ClassDeclaration
 * @typedef {import("@typescript-eslint/utils").TSESTree.Decorator} Decorator
 * @typedef {import("@typescript-eslint/utils").TSESTree.CallExpression} CallExpression
 * @typedef {import("@typescript-eslint/utils").TSESTree.Identifier} Identifier
 **/

/**
 * @param {ClassDeclaration} node
 **/
module.exports = (node) => {
  return /** @type {undefined | (Decorator & { expression: CallExpression & { callee: Identifier } })} */ (
    node.decorators.find(
      (decorator) =>
        decorator.expression.type === AST_NODE_TYPES.CallExpression &&
        decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
        decorator.expression.callee.name === "Controller",
    )
  );
};
