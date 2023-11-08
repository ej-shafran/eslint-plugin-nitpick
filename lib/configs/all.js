const allRules = require("../rules");

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: ["nitpick"],
  rules: Object.fromEntries(
    Object.keys(allRules).map((key) => [`nitpick/${key}`, 2]),
  ),
};
