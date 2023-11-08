"use strict";

const rule = require("../lib/rules/no-redundant-vars");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: "latest" } });

ruleTester.run("no-redundant-vars", rule, {
  valid: [
    {
      name: "should ignore a simple return",
      code: `\
function temporary() {
  return 10;
}`,
    },
    {
      name: "should ignore a used variable",
      code: `\
function temporary() {
  const x = 10;
  console.log(x);
  return x;
}`,
    },
  ],

  invalid: [
    {
      name: "should error for a redundant variable",
      code: `\
function temporary() {
  const x = 10;
  return x;
}`,
      errors: [{ messageId: "noRedundantVars" }],
    },
  ],
});
