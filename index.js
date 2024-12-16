import fs from "fs";

import noRedundantVars from "./lib/rules/no-redundant-vars.js";
import noUselessInterpolation from "./lib/rules/no-useless-interpolation.js";
import noUselessRest from "./lib/rules/no-useless-rest.js";
import preferIfConditionals from "./lib/rules/prefer-if-conditionals.js";
import preferNotEquals from "./lib/rules/prefer-not-equals.js";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

/** @type {Record<string, import("eslint").Rule.RuleModule>} */
const rules = {
  "no-redundant-vars": noRedundantVars,
  "no-useless-interpolation": noUselessInterpolation,
  "no-useless-rest": noUselessRest,
  "prefer-if-conditionals": preferIfConditionals,
  "prefer-not-equals": preferNotEquals,
};

/** @type {import("eslint").ESLint.Plugin} */
const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules,
  configs: {
    get recommended() {
      return recommended;
    },
    get all() {
      return all;
    },
  },
  processors: {},
};

/** @type {import("eslint").Linter.Config} */
const recommended = {
  plugins: {
    nitpick: plugin,
  },
  rules: {
    "nitpick/no-redundant-vars": "error",
    "nitpick/no-useless-interpolation": "error",
    "nitpick/no-useless-rest": "error",
    "nitpick/prefer-if-conditionals": "error",
    "nitpick/prefer-not-equals": "error",
  },
};

/** @type {import("eslint").Linter.Config} */
const all = {
  plugins: {
    nitpick: plugin,
  },
  rules: Object.fromEntries(
    Object.keys(rules).map((key) => [`nitpick/${key}`, 2]),
  ),
};

export default plugin;
