import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  ...tseslint.configs.recommended,
  nextPlugin.flatConfig.coreWebVitals,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooksPlugin.configs["recommended-latest"],
  prettier,
  {
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // TypeScript handles type checking; prop-types are redundant
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: [".next/**"],
  }
);
