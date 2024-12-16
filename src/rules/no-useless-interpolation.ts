import docsUrl from "../utils/docsUrl.js";
import { Rule } from "eslint";
import { Literal } from "estree";

const rule: Rule.RuleModule = {
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
      useLiteral: "Use the literal `{{literal}}` instead",
    },
    fixable: "code",
  },
  create(context) {
    return {
      TemplateLiteral(node) {
        const literals = node.expressions.filter(
          (
            expression,
          ): expression is Literal & {
            value: Exclude<Literal["value"], RegExp>;
          } =>
            expression.type === "Literal" &&
            !(expression.value instanceof RegExp),
        );
        literals.forEach((literal) => {
          function fix(fixer: Rule.RuleFixer) {
            const range = literal.range;
            if (!range) return [];
            return fixer.replaceTextRange(
              [range[0] - 2, range[1] + 1],
              String(literal.value),
            );
          }

          context.report({
            node: literal,
            messageId: "noUselessInterpolation",
            fix,
            suggest: [
              {
                messageId: "useLiteral",
                data: {
                  literal: String(literal.value),
                },
                fix,
              },
            ],
          });
        });
      },
    };
  },
};

export default rule;
