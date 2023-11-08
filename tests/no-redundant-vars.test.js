"use strict";

const rule = require("../lib/rules/no-redundant-vars");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: "latest" } });

ruleTester.run("no-redundant-vars", rule, {
  valid: [
    {
      code: "function temporary() { return 10; }",
      options: [],
    },
  ],

  invalid: [
    {
      code: "function temporary() {\nconst x = 10;\nreturn x;\n}",
      errors: [{ messageId: "noRedundantVars" }],
      output: "function temporary() {\n\nreturn 10;\n}"
    },
  ],
});
