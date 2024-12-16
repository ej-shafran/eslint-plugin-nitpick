/** @param {import("estree").Node} node */
export default (node) =>
  !["Literal", "Identifier", "CallExpression"].includes(node.type);
