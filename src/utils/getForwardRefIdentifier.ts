import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

export default function (node: TSESTree.Decorator) {
  // Check for `@Inject(...)`
  const { expression } = node;
  if (
    expression.type !== AST_NODE_TYPES.CallExpression ||
    expression.callee.type !== AST_NODE_TYPES.Identifier ||
    expression.callee.name !== "Inject"
  )
    return null;

  // Inside that, check for `forwardRef(...)`
  const firstArgument = expression.arguments[0];
  if (
    !firstArgument ||
    firstArgument.type !== AST_NODE_TYPES.CallExpression ||
    firstArgument.callee.type !== AST_NODE_TYPES.Identifier ||
    firstArgument.callee.name !== "forwardRef"
  )
    return null;

  // Inside that, check for a function or an arrow function
  const forwardRefFirstArgument = firstArgument.arguments[0];
  if (
    !forwardRefFirstArgument ||
    (forwardRefFirstArgument.type !== AST_NODE_TYPES.ArrowFunctionExpression &&
      forwardRefFirstArgument.type !== AST_NODE_TYPES.FunctionExpression)
  )
    return null;

  const arrowFunctionBody = forwardRefFirstArgument.body;

  // If an identifier is directly returned, that's the forwarded ref
  if (arrowFunctionBody.type === AST_NODE_TYPES.Identifier) {
    return arrowFunctionBody;
  }

  // Otherwise, we accept only a body which has one statment
  if (
    arrowFunctionBody.type !== AST_NODE_TYPES.BlockStatement ||
    arrowFunctionBody.body.length !== 1
  ) {
    return null;
  }

  // And that statement must be `return ...` with some identifier
  const onlyStatement = arrowFunctionBody.body[0];
  if (
    onlyStatement.type !== AST_NODE_TYPES.ReturnStatement ||
    !onlyStatement.argument ||
    onlyStatement.argument.type !== AST_NODE_TYPES.Identifier
  )
    return null;

  // ...which is the forwarded ref
  return onlyStatement.argument;
}
