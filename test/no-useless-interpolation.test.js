"use strict";

const rule = require("../lib/rules/no-useless-interpolation");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("no-useless-interpolation", rule, {
  valid: [
    {
      name: "should allow a variable being interpolated",
      code: "`${someVar}`",
    },
    {
      name: "should allow a literal in a broader context",
      code: '`${someVar ? "literal" : "otherLiteral"}`',
    },
  ],
  invalid: [
    {
      name: "should fail for a single literal expression",
      code: '`${"literal"}`',
      errors: [
        {
          messageId: "noUselessInterpolation",
          suggestions: [
            {
              messageId: "useLiteral",
              output: "`literal`",
            },
          ],
        },
      ],
      output: "`literal`",
    },

    {
      name: "should fail if there are other things in the literal",
      code: '`${"hi"} there`',
      errors: [
        {
          messageId: "noUselessInterpolation",
          suggestions: [
            {
              messageId: "useLiteral",
              output: "`hi there`",
            },
          ],
        },
      ],
      output: "`hi there`",
    },

    {
      name: "should work for a number literal",
      code: "`${10} there`",
      errors: [
        {
          messageId: "noUselessInterpolation",
          suggestions: [
            {
              messageId: "useLiteral",
              output: "`10 there`",
            },
          ],
        },
      ],
      output: "`10 there`",
    },

    {
      name: "should work for a boolean literal",
      code: "`${true} there`",
      errors: [
        {
          messageId: "noUselessInterpolation",
          suggestions: [
            {
              messageId: "useLiteral",
              output: "`true there`",
            },
          ],
        },
      ],
      output: "`true there`",
    },
  ],
});
