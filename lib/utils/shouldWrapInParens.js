/** @param {import("estree").Node} node */
module.exports = (node) =>
  !["Literal", "Identifier", "CallExpression"].includes(node.type);
