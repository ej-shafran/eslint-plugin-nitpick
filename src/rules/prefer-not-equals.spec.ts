import rule from "./prefer-not-equals.js";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester();

type Operator = "==" | "===";
type ReverseOperator = "!=" | "!==";

function invalidTestCases(
  operator: Operator,
  reverseOperator: ReverseOperator,
): RuleTester.InvalidTestCase[] {
  return [
    {
      name: "should fail when negating an equality check",
      code: `!(a ${operator} b)`,
      errors: [
        {
          messageId: "preferNotEquals",
          suggestions: [
            {
              messageId: "useNotEquals",
              output: `(a ${reverseOperator} b)`,
            },
          ],
        },
      ],
    },
  ];
}

function validTestCases(
  operator: Operator,
  reverseOperator: ReverseOperator,
): RuleTester.ValidTestCase[] {
  return [
    {
      name: `should allow comparing things with ${reverseOperator}`,
      code: `(a ${reverseOperator} b)`,
    },
    {
      name: "should ignore more complex cases",
      code: `!(a ${operator} b && c ${operator} d)`,
    },
    {
      name: "should ignore more complex cases",
      code: `!(a ${operator} b || c ${operator} d)`,
    },
  ];
}

ruleTester.run("prefer-not-equals", rule, {
  valid: [
    {
      name: "should allow inverting other operators",
      code: "!(a())",
    },
    {
      name: "should allow inverting other operators",
      code: "!(a > b)",
    },
    ...validTestCases("===", "!=="),
    ...validTestCases("==", "!="),
  ],
  invalid: [...invalidTestCases("===", "!=="), ...invalidTestCases("==", "!=")],
});
