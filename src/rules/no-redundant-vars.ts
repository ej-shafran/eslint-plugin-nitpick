import docsUrl from "../utils/docsUrl.js";
import shouldWrapInParens from "../utils/shouldWrapInParens.js";
import { VariableDeclaration, VariableDeclarator } from "estree";
import { Rule } from "eslint";

const rule: Rule.RuleModule = {
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
    fixable: undefined,
  },
  create(context) {
    return {
      ReturnStatement(node) {
        if (!node.argument || !("name" in node.argument)) return;

        const argument = node.argument;
        const scope = context.sourceCode.getScope(node);
        const variable = scope.set.get(argument.name);

        if (!variable || variable.references.length !== 2) return;

        if (scope.block.type === "FunctionDeclaration") {
          const declaration = variable.defs[0]?.parent;
          if (declaration && declaration.type === "VariableDeclaration") {
            const functionBlock = scope.block.body;
            const returnIndex = functionBlock.body.indexOf(node);
            const definitionIndex = functionBlock.body.indexOf(declaration);
            if (returnIndex - definitionIndex > 1) return;
          }
        }

        const def:
          | (VariableDeclarator & {
              parent: VariableDeclaration;
            })
          | undefined = variable.defs[0]?.node;
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

export default rule;
