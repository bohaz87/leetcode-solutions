// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import nodePlugin from "eslint-plugin-n";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...nodePlugin.configs["flat/mixed-esm-and-cjs"],
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
      "n/no-unpublished-import": "off",
    },
  },
  {
    files: ["**/*.test.js", "test/**"],
    ...jest.configs["flat/recommended"],
    settings: {
      jest: true,
    },
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  }
);
