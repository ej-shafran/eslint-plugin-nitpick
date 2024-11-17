/** @type {NonNullable<import("eslint").ESLint.Plugin["rules"]>} */
module.exports = {
  "no-redundant-vars": require("./no-redundant-vars"),
  "no-useless-interpolation": require("./no-useless-interpolation"),
  "no-useless-rest": require("./no-useless-rest"),
  "prefer-if-conditionals": require("./prefer-if-conditionals"),
  "prefer-not-equals": require("./prefer-not-equals"),
};
