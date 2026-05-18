import eslintConfigNext from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

const eslintConfig = tseslint.config(
  ...eslintConfigNext,
  ...tseslint.configs.recommended,
  {
    ignores: [".next/*", "node_modules/*", "public/*"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "react-hooks/exhaustive-deps": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }]
    }
  }
);

export default eslintConfig;
