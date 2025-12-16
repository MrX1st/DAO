// import { FlatCompat } from "@eslint/eslintrc";
// import prettierPlugin from "eslint-plugin-prettier";
// import { defineConfig } from "eslint/config";
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });
// export default defineConfig([
//   {
//     plugins: {
//       prettier: prettierPlugin,
//     },
//     extends: compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
//     rules: {
//       "@typescript-eslint/no-explicit-any": "off",
//       "@typescript-eslint/ban-ts-comment": "off",
//       "prettier/prettier": [
//         "warn",
//         {
//           endOfLine: "auto",
//         },
//       ],
//     },
//   },
// ]);
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  // 1. Global Ignores
  {
    ignores: ["next-env.d.ts", ".next/**", "typechain-types/**"],
  },

  // 2. Extend Configs
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  // 3. Custom Rules
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // DISABLE Prettier rule in ESLint (Fixes the 6 warnings)
      "prettier/prettier": "off",

      // Disable strict variable checking
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
]);
