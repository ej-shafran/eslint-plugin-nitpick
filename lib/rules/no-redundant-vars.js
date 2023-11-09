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

        if (id.type !== "Identifier") {
          // destructring an `await` expression should not be counted for this rule,
          // since doing something like
          // ```const { result } = await doSomething();```
          // is actually a useful pattern
          if (init.type === "AwaitExpression") return;

          // if there are other destructured elements, it makes sense to destructure
          // this returned variable as well instead of referring to it using property/index access
          if (id.type === "ObjectPattern" && id.properties.length > 1) return;
          if (
            id.type === "ArrayPattern" &&
            id.elements.filter(Boolean).length > 1
          )
            return;
        }

        context.report({
          node: argument,
          messageId: "noRedundantVars",
          suggest: [
            {
              messageId: "inlineVariable",
              data: {
                variable: variable.name,
              },
              *fix(fixer) {
                if (id.type === "ObjectPattern") {
                  yield fixer.replaceText(
                    argument,
                    context.sourceCode.getText(init) + "." + variable.name,
                  );
                } else if (id.type === "ArrayPattern") {
                  const index = id.elements.findIndex(
                    (element) =>
                      element &&
                      element.type === "Identifier" &&
                      element.name === variable.name,
                  );
                  if (index < 0) {
                    throw new Error(
                      "TODO: handle cases where destructuring is nested? or leave this as unfixable",
                    );
                  }

                  yield fixer.replaceText(
                    argument,
                    context.sourceCode.getText(init) + "[" + index + "]",
                  );
                } else {
                  yield fixer.replaceText(
                    argument,
                    context.sourceCode.getText(init),
                  );
                }

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
