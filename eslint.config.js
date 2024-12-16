import eslintPlugin from "eslint-plugin-eslint-plugin";
import n from "eslint-plugin-n";
import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  n.configs["flat/recommended-script"],
  eslintPlugin.configs["flat/recommended"],
  {
    plugins: {
      "eslint-plugin": eslintPlugin,
      n,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      "n/exports-style": ["error", "module.exports"],
    },
  },
];
