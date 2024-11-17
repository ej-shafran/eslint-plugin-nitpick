const docsUrl = require("../utils/docsUrl");

/**
 * @param {import("estree").Expression} node
 * @param {import("eslint").SourceCode} sourceCode
 * @returns {{ node: import("estree").Node; newText: string; actualChange: boolean }[]}
 */
function walk(node, sourceCode) {
  if (node.type === "BinaryExpression") {
    if (node.operator.startsWith("==")) {
      const newOperator = `!${node.operator.slice(1)}`;
      const leftText = sourceCode.getText(node.left);
      const rightText = sourceCode.getText(node.right);

      return [
        {
          node,
          newText: `${leftText} ${newOperator} ${rightText}`,
          actualChange: true,
        },
      ];
    }

    return [];
  }

  if (node.type === "LogicalExpression") {
    return [...walk(node.left, sourceCode), ...walk(node.right, sourceCode)];
  }

  return [
    { node, newText: `!(${sourceCode.getText(node)})`, actualChange: false },
  ];
}

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: true,
    docs: {
      description:
        "Prefer using the not-equals operator (`a !== b`) over inverting the equals operator (`!(a === b)`)",
      recommended: true,
      url: docsUrl("prefer-not-equals"),
    },
    type: "suggestion",
    schema: [],
    messages: {
      preferNotEquals: "Prefer `a !== b` over `!(a === b)`",
      useNotEquals: "Use `!==` instead",
    },
  },
  create(context) {
    return {
      UnaryExpression(node) {
        if (node.operator !== "!" || !node.range) return;

        /** @type {import("eslint").AST.Range} */
        const operatorRange = [node.range[0], node.range[0] + 1];

        const nodesToFix = walk(node.argument, context.sourceCode);
        if (!nodesToFix.some(({ actualChange }) => actualChange)) return;

        context.report({
          node,
          messageId: "preferNotEquals",
          suggest: [
            {
              messageId: "useNotEquals",
              *fix(fixer) {
                for (const { node, newText } of nodesToFix) {
                  // Replace all the internal nodes
                  yield fixer.replaceText(node, newText);
                }
                // Remove the !
                yield fixer.removeRange(operatorRange);
              },
            },
          ],
        });
      },
    };
  },
};
