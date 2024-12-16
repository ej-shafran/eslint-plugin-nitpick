"use strict";

import rule from "../lib/rules/prefer-not-equals.js";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester();

/**
 * @param {"==" | "==="} operator
 * @param {"!=" | "!=="} reverseOperator
 * @returns {RuleTester.InvalidTestCase[]}
 **/
function invalidTestCases(operator, reverseOperator) {
  return [
    {
      name: "should fail when negating an equality check",
      code: `if (!(a ${operator} b)) {}`,
      errors: [
        {
          messageId: "preferNotEquals",
          suggestions: [
            {
              messageId: "useNotEquals",
              output: `if ((a ${reverseOperator} b)) {}`,
            },
          ],
        },
      ],
    },
    {
      name: "should fail even for multiple expressions",
      code: `if (!(a ${operator} b || c.something())) {}`,
      errors: [
        {
          messageId: "preferNotEquals",
          suggestions: [
            {
              messageId: "useNotEquals",
              output: `if ((a ${reverseOperator} b || !(c.something()))) {}`,
            },
          ],
        },
      ],
    },
    {
      name: "should fail even for multiple expressions",
      code: `if (!(c || a ${operator} b || d.something())) {}`,
      errors: [
        {
          messageId: "preferNotEquals",
          suggestions: [
            {
              messageId: "useNotEquals",
              output: `if ((!(c) || a ${reverseOperator} b || !(d.something()))) {}`,
            },
          ],
        },
      ],
    },
  ];
}

ruleTester.run("prefer-not-equals", rule, {
  valid: [
    {
      name: "should allow comparing things with !==",
      code: ["if (a !== b) {}"].join("\n"),
    },
    {
      name: "should allow comparing things with !=",
      code: ["if (a != b) {}"].join("\n"),
    },
    {
      name: "should allow inverting other operators",
      code: ["if (!a()) {}"].join("\n"),
    },
  ],
  invalid: [...invalidTestCases("===", "!=="), ...invalidTestCases("==", "!=")],
});
