const docsUrl = require("../utils/docsUrl");
const shouldWrapInParens = require("../utils/shouldWrapInParens");

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
        if (scope.block.type === "FunctionDeclaration") {
          if (variable?.defs[0]?.parent) {
            const returnIndex = scope.block.body.body.indexOf(node);
            const definitionIndex = scope.block.body.body.indexOf(
              /** @type {import("estree").Statement} */ (
                variable.defs[0].parent
              ),
            );
            if (returnIndex - definitionIndex > 1) return;
          }
        }

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
                let text = context.sourceCode.getText(init);
                if (shouldWrapInParens(init)) text = `(${text})`;

                if (id.type === "ObjectPattern") {
                  if (id.properties[0]?.type !== "Property") return null;

                  text += `.${variable.name}`;
                } else if (id.type === "ArrayPattern") {
                  const index = id.elements.findIndex(
                    (el) =>
                      el?.type === "Identifier" && el?.name === variable.name,
                  );
                  if (index < 0) return null;

                  text += `[${index}]`;
                }

                yield fixer.replaceText(argument, text);

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
