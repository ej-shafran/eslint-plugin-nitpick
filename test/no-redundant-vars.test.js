"use strict";

const rule = require("../lib/rules/no-redundant-vars");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

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
    {
      name: "should ignore an empty return",
      code: `\
function temporary() {
  return;
}`,
    },
    {
      name: "should ignore a destructured `await`",
      code: `\
async function temporary() {
  const { result } = await doSomething();
  return result;
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
      errors: [
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "x" },
              output: `\
function temporary() {
  
  return 10;
}`,
            },
          ],
        },
      ],
    },
    {
      name: "should work for multiple declarations",
      code: `\
function temporary() {
  const a = 10, b = 20, c = 30;
  return b;
}`,
      errors: [
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "b" },
              output: `\
function temporary() {
  const a = 10, c = 30;
  return 20;
}`,
            },
          ],
        },
      ],
    },
    {
      name: "should properly handle object destructuring",
      code: `\
function temporary() {
  const { result } = data;
  return result;
}`,
      errors: [
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "result" },
              output: `\
function temporary() {
  
  return data.result;
}`,
            },
          ],
        },
      ],
    },
  ],
});
