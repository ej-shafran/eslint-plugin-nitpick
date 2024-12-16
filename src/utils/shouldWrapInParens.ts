import { Node } from "estree";

export default (node: Node) =>
  !["Literal", "Identifier", "CallExpression"].includes(node.type);
