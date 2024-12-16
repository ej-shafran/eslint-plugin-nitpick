import docsUrl from "../utils/docsUrl.js";

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    hasSuggestions: true,
    docs: {
      description:
        "Warns against using a rest element without destructuring other properties/elements",
      recommended: true,
      url: docsUrl("no-useless-rest"),
    },
    type: "suggestion",
    schema: [
      {
        type: "object",
        properties: {
          array: { type: "boolean", default: true },
          object: { type: "boolean", default: true },
        },
      },
    ],
    messages: {
      noUselessRest: "Don't use a meaningless rest element",
      useNormalVariable: "Use a normal variable instead of a rest element",
    },
    fixable: undefined,
  },
  create(context) {
    const options = {
      array: true,
      object: true,
      ...(context.options[0] ?? {}),
    };

    return {
      ArrayPattern(node) {
        if (
          options.array &&
          node.elements.length === 1 &&
          node.elements[0]?.type === "RestElement"
        ) {
          const rest = node.elements[0];

          context.report({
            node: rest,
            messageId: "noUselessRest",
            suggest: [
              {
                messageId: "useNormalVariable",
                fix(fixer) {
                  return fixer.replaceText(
                    node,
                    context.sourceCode.getText(rest.argument),
                  );
                },
              },
            ],
          });
        }
      },
      ObjectPattern(node) {
        if (
          options.object &&
          node.properties.length === 1 &&
          node.properties[0].type === "RestElement"
        ) {
          const rest = node.properties[0];

          context.report({
            node: rest,
            messageId: "noUselessRest",
            suggest: [
              {
                messageId: "useNormalVariable",
                fix(fixer) {
                  return fixer.replaceText(
                    node,
                    context.sourceCode.getText(rest.argument),
                  );
                },
              },
            ],
          });
        }
      },
    };
  },
};
