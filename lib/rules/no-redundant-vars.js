/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: {
      noRedundantVars: "Don't declare a variable which is only returned.",
    },
    fixable: null,
  },
  create(context) {
    return {
      ReturnStatement(node) {
        if (!node.argument || !("name" in node.argument)) return;

        const argument = node.argument;
        const scope = context.sourceCode.getScope(node);
        const variable = scope.set.get(argument.name);

        if (!variable || variable.references.length !== 2) return;

        context.report({
          node: node.argument,
          messageId: "noRedundantVars",
        });
      },
    };
  },
};
