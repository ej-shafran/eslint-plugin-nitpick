// @ts-check

import eslintPlugin from "eslint-plugin-eslint-plugin";
import n from "eslint-plugin-n";
import globals from "globals";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  n.configs["flat/recommended"],
  eslintPlugin.configs.recommended,
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
      "n/no-missing-import": ["error", { ignoreTypeImport: true }],
      "n/exports-style": ["error", "module.exports"],
    },
  },
  { files: ["src/**/*.ts"] },
);
