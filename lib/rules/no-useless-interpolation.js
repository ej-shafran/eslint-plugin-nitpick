const docsUrl = require("../utils/docsUrl");

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: true,
    docs: {
      description:
        "Warns against template-literal interpolation with a literal",
      recommended: true,
      url: docsUrl("no-useless-interpolation"),
    },
    type: "suggestion",
    schema: [],
    messages: {
      noUselessInterpolation: "don't interpolate a literal",
      useLiteral: "use the literal `{{literal}}` instead",
    },
    fixable: "code",
  },
  create(context) {
    return {
      TemplateLiteral(node) {
        const literals = node.expressions.filter(
          /** @returns {expression is import("estree").Literal & { value: Exclude<import("estree").Literal["value"], RegExp>}} */ (
            expression,
          ) =>
            expression.type === "Literal" &&
            !(expression.value instanceof RegExp),
        );
        literals.forEach((literal) => {
          context.report({
            node: literal,
            messageId: "noUselessInterpolation",
            fix(fixer) {
              const range = literal.range;
              if (!range) return [];
              return fixer.replaceTextRange(
                [range[0] - 2, range[1] + 1],
                String(literal.value),
              );
            },
            suggest: [
              {
                messageId: "useLiteral",
                data: {
                  literal: String(literal.value),
                },
                fix(fixer) {
                  const range = literal.range;
                  if (!range) return [];
                  return fixer.replaceTextRange(
                    [range[0] - 2, range[1] + 1],
                    String(literal.value),
                  );
                },
              },
            ],
          });
        });
      },
    };
  },
};
