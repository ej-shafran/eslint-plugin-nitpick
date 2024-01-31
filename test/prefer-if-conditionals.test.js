"use strict";

const rule = require("../lib/rules/prefer-if-conditionals");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("prefer-if-conditionals", rule, {
  valid: [
    {
      name: "should allow conditionals stored in variables",
      code: [
        "const x = isOk && someThing();",
        "const y = isNotOk || someThing();",
      ].join("\n"),
    },
    {
      name: "should allow conditionals passed to functions",
      code: ["someThing(a && b())", "someThing(c || d())"].join("\n"),
    },
  ],
  invalid: [
    {
      name: "should fail for unused conditionals",
      code: "isOk && someThing",
      errors: [
        {
          messageId: "preferIfConditionals",
          suggestions: [
            {
              messageId: "useIfStatement",
              output: "if (isOk) someThing",
            },
          ],
        },
      ],
      output: "if (isOk) someThing",
    },
    {
      name: "should properly fix complex inputs",
      code: "!isBad || isOk && someThing",
      errors: [
        {
          messageId: "preferIfConditionals",
          suggestions: [
            {
              messageId: "useIfStatement",
              output: "if (!isBad || isOk) someThing",
            },
          ],
        },
      ],
      output: "if (!isBad || isOk) someThing",
    },
    {
      name: "should properly invert `||` cases",
      code: "!isBad || isOk || someThing",
      errors: [
        {
          messageId: "preferIfConditionals",
          suggestions: [
            {
              messageId: "useIfStatement",
              output: "if (!(!isBad || isOk)) someThing",
            },
          ],
        },
      ],
      output: "if (!(!isBad || isOk)) someThing",
    },
    {
      name: "should catch ternary expressions",
      code: "isBad ? doThisThing() : doThatThing()",
      errors: [
        {
          messageId: "preferIfConditionals",
          suggestions: [
            {
              messageId: "useIfStatement",
              output: "if (isBad) { doThisThing() } else { doThatThing() }",
            },
          ],
        },
      ],
      output: "if (isBad) { doThisThing() } else { doThatThing() }",
    },
  ],
});
