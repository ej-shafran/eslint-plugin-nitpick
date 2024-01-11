const docsUrl = require("../utils/docsUrl");

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: true,
    docs: {
      description:
        "Prefer an `if` statement to using logical operators (`&&` or `||`) when relevant",
      recommended: true,
      url: docsUrl("prefer-if-conditionals"),
    },
    type: "suggestion",
    schema: [],
    messages: {
      preferIfConditionals: "Prefer an `if` statement for conditionals",
      useIfStatement: "Use an `if` statement here instead",
    },
    fixable: "code",
  },
  create(context) {
    return {
      ExpressionStatement(node) {
        if (node.expression.type !== "LogicalExpression") return;
        const expression = node.expression;

        /**
         * @param {import("eslint").Rule.RuleFixer} fixer
         **/
        function fix(fixer) {
          let expr = expression;
          let left = context.sourceCode.getText(expr.left);
          while (expr?.right.type === "LogicalExpression") {
            const rightLeft = context.sourceCode.getText(expr.right.left);
            left += ` ${expr.operator} ${rightLeft}`;
            expr = expr.right;
          }
          const right = context.sourceCode.getText(expr.right);
          const isOr = expr.operator === "||";

          let final = "if (";
          if (isOr) final += "!(";
          final += left;
          if (isOr) final += ")";
          final += ") " + right;
          return fixer.replaceText(expression, final);
        }

        context.report({
          node: expression,
          messageId: "preferIfConditionals",
          fix,
          suggest: [
            {
              messageId: "useIfStatement",
              fix,
            },
          ],
        });
      },
    };
  },
};
