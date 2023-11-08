/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: {
      noRedundantVars: "Don't declare a variable which is only returned.",
    },
    fixable: "code",
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
          *fix(fixer) {
            /** @type {(import("estree").VariableDeclarator & { parent: import("estree").VariableDeclaration }) | undefined} */
            const def = variable.defs[0]?.node;
            if (!def || !def.init) return;

            const value = context.sourceCode.getText(def.init);

            yield fixer.replaceText(argument, value);
            yield fixer.remove(def.parent);
          },
        });
      },
    };
  },
};
