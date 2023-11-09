"use strict";

const rule = require("../lib/rules/no-useless-rest");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("no-useless-rest", rule, {
  valid: [
    {
      name: "should ignore a useful rest argument (object)",
      code: "const { key, ...rest } = obj;",
    },
    {
      name: "should ignore a useful rest argument (array)",
      code: "const [el, ...rest] = arr;",
    },
  ],

  invalid: [
    {
      name: "should error for a useless rest element (object)",
      code: "const { ...rest } = obj;",
      errors: [
        {
          messageId: "noUselessRest",
          suggestions: [
            {
              messageId: "useNormalVariable",
              output: "const rest = obj;",
            },
          ],
        },
      ],
    },
    {
      name: "should error for a useless rest element (array)",
      code: "const [...rest] = arr;",
      errors: [
        {
          messageId: "noUselessRest",
          suggestions: [
            {
              messageId: "useNormalVariable",
              output: "const rest = arr;",
            },
          ],
        },
      ],
    },
  ],
});
