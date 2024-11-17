"use strict";

const rule = require("../lib/rules/prefer-not-equals");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("prefer-not-equals", rule, {
  valid: [
    {
      name: "should allow comparing things with !==",
      code: ["if (a !== b) {}"].join("\n"),
    },
  ],
  invalid: [
    {
      name: "should fail when negating an equality check",
      code: ["if (!(a === b)) {}"].join("\n"),
      errors: [
        {
          messageId: "preferNotEquals",
          suggestions: [
            { messageId: "useNotEquals", output: "if (a !== b) {}" },
          ],
        },
      ],
    },
    {
      name: "should fail even for multiple expressions",
      code: ["if (!(a === b || a.startsWith())) {}"].join("\n"),
      errors: [
        {
          messageId: "preferNotEquals",
          suggestions: [
            {
              messageId: "useNotEquals",
              output: "if (a !== b || !(a.startsWith())) {}",
            },
          ],
        },
      ],
    },
  ],
});
