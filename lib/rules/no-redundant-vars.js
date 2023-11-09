const docsUrl = require("../utils/docsUrl");

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: true,
    docs: {
      description:
        "Warns against variables that are returned without any other usage",
      recommended: true,
      url: docsUrl("no-redundant-vars"),
    },
    type: "suggestion",
    schema: [],
    messages: {
      noRedundantVars: "Don't declare a variable which is only returned",
      inlineVariable: "Inline `{{ variable }}`",
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

        /** @type {(import("estree").VariableDeclarator & { parent: import("estree").VariableDeclaration }) | undefined} */
        const def = variable.defs[0]?.node;
        if (!def || !def.init) return;

        const id = def.id;
        const init = def.init;

        // destructring an `await` expression should not be counted for this rule,
        // since doing something like
        // ```const { result } = await doSomething();```
        // is actually a useful pattern
        if (id.type !== "Identifier" && init.type === "AwaitExpression") return;

        context.report({
          node: node.argument,
          messageId: "noRedundantVars",
          suggest: [
            {
              messageId: "inlineVariable",
              data: {
                variable: variable.name,
              },
              *fix(fixer) {
                yield fixer.replaceText(
                  argument,
                  context.sourceCode.getText(init),
                );

                if (def.parent.declarations.length === 1) {
                  yield fixer.remove(def.parent);
                } else {
                  const declarations = def.parent.declarations.reduce(
                    (acc, cur) => {
                      if (context.sourceCode.getText(cur.id) === variable.name)
                        return acc;

                      if (acc)
                        return acc + ", " + context.sourceCode.getText(cur);

                      return context.sourceCode.getText(cur);
                    },
                    "",
                  );

                  yield fixer.replaceText(
                    def.parent,
                    `${def.parent.kind} ${declarations};`,
                  );
                }
              },
            },
          ],
        });
      },
    };
  },
};
