import { AST, Rule } from "eslint";
import docsUrl from "../utils/docsUrl.js";

const rule: Rule.RuleModule = {
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
        if (
          node.operator !== "!" ||
          !node.range ||
          node.argument.type !== "BinaryExpression" ||
          !node.argument.operator.startsWith("==")
        )
          return;

        const operatorRange: AST.Range = [node.range[0], node.range[0] + 1];

        const newOperator = `!${node.argument.operator.slice(1)}`;
        const leftText = context.sourceCode.getText(node.argument.left);
        const rightText = context.sourceCode.getText(node.argument.right);
        const newText = `${leftText} ${newOperator} ${rightText}`;

        context.report({
          node,
          messageId: "preferNotEquals",
          suggest: [
            {
              messageId: "useNotEquals",
              *fix(fixer) {
                // Replace the internal operator
                yield fixer.replaceText(node.argument, newText);
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

export default rule;
