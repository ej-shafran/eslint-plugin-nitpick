"use strict";

const rule = require("../lib/rules/no-redundant-vars");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("no-redundant-vars", rule, {
  valid: [
    {
      name: "should ignore a simple return",
      code: ["function temporary() {", "  return 10;", "}"].join("\n"),
    },
    {
      name: "should ignore a used variable",
      code: [
        "function temporary() {",
        "  const x = 10;",
        "  console.log(x);",
        "  return x;",
        "}",
      ].join("\n"),
    },
    {
      name: "should ignore if there is code between the declaration and return",
      code: [
        "function temporary() {",
        "  const x = 10;",
        "  doSomethingThatHasToHappenAfterX();",
        "  return x",
        "}",
      ].join("\n"),
    },
    {
      name: "should ignore an empty return",
      code: ["function temporary() {", "  return;", "}"].join("\n"),
    },
    {
      name: "should ignore a destructured `await`",
      code: [
        "async function temporary() {",
        "  const { result } = await doSomething();",
        "  return result;",
        "}",
        "",
        "async function other() {",
        "  const [result] = await doSomething();",
        "  return result;",
        "}",
      ].join("\n"),
    },
    {
      name: "should ignore one of many destructured elements",
      code: [
        "function temporary() {",
        "  const { keyA, keyB } = obj;",
        "  return keyB;",
        "}",
        "",
        "function other() {",
        "  const [elA, elB] = arr;",
        "  return elA;",
        "}",
      ].join("\n"),
    },
  ],

  invalid: [
    {
      name: "should error for a redundant variable",
      code: [
        "function temporary() {",
        "  const x = 10;",
        "  return x;",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "x" },
              output: [
                "function temporary() {",
                "  ",
                "  return 10;",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
    {
      name: "should work for multiple declarations",
      code: [
        "function temporary() {",
        "  const a = 10, b = 20, c = 30;",
        "  return b;",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "b" },
              output: [
                "function temporary() {",
                "  const a = 10, c = 30;",
                "  return 20;",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
    {
      name: "should properly handle object destructuring",
      code: [
        "function temporary() {",
        "  const { result } = data;",
        "  return result;",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "result" },
              output: [
                "function temporary() {",
                "  ",
                "  return data.result;",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
    {
      name: "should properly handle array destructring",
      code: [
        "function temporary() {",
        "  const [result] = data;",
        "  return result;",
        "}",
        "",
        "function other() {",
        "  const [, result] = data;",
        "  return result;",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "result" },
              output: [
                "function temporary() {",
                "  ",
                "  return data[0];",
                "}",
                "",
                "function other() {",
                "  const [, result] = data;",
                "  return result;",
                "}",
              ].join("\n"),
            },
          ],
        },
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "result" },
              output: [
                "function temporary() {",
                "  const [result] = data;",
                "  return result;",
                "}",
                "",
                "function other() {",
                "  ",
                "  return data[1];",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
    {
      name: "should wrap complicated expressions in parens",
      code: [
        "function temporary() {",
        "  const { result } = a ? b : c;",
        "  return result;",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "noRedundantVars",
          suggestions: [
            {
              messageId: "inlineVariable",
              data: { variable: "result" },
              output: [
                "function temporary() {",
                "  ",
                "  return (a ? b : c).result;",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
  ],
});
