import tseslint from "typescript-eslint";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = tseslint.config(
  ...nextCoreWebVitals,
  ...tseslint.configs.recommended,
  {
    settings: {
      react: {
        version: "19",
      },
    },
    ignores: [".next/*", "node_modules/*", "public/*"],
  }
);

export default eslintConfig;
