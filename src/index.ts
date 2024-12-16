import fs from "fs";

import noRedundantVars from "./rules/no-redundant-vars.js";
import noUselessInterpolation from "./rules/no-useless-interpolation.js";
import noUselessRest from "./rules/no-useless-rest.js";
import preferIfConditionals from "./rules/prefer-if-conditionals.js";
import preferNotEquals from "./rules/prefer-not-equals.js";
import { ESLint, Linter, Rule } from "eslint";

const pkg = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const rules: Record<string, Rule.RuleModule> = {
  "no-redundant-vars": noRedundantVars,
  "no-useless-interpolation": noUselessInterpolation,
  "no-useless-rest": noUselessRest,
  "prefer-if-conditionals": preferIfConditionals,
  "prefer-not-equals": preferNotEquals,
};

const plugin: ESLint.Plugin = {
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

const recommended: Linter.Config = {
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

const all: Linter.Config = {
  plugins: {
    nitpick: plugin,
  },
  rules: Object.fromEntries(
    Object.keys(rules).map((key) => [`nitpick/${key}`, 2]),
  ),
};

export default plugin;
