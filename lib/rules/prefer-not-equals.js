const docsUrl = require("../utils/docsUrl");

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: "TODO",
      recommended: true,
      url: docsUrl("prefer-not-equals"),
    },
    type: "suggestion",
    schema: [],
    messages: {
      preferNotEquals: "TODO",
    },
  },
  create(context) {
    throw new Error("TODO");
  },
};
