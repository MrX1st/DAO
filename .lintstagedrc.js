// const path = require("path");

// const buildNextEslintCommand = (filenames) =>
//   `yarn next:lint --fix --file ${filenames
//     .map((f) => path.relative(path.join("packages", "nextjs"), f))
//     .join(" --file ")}`;

// const checkTypesNextCommand = () => "yarn next:check-types";

// const buildHardhatEslintCommand = (filenames) =>
//   `yarn hardhat:lint-staged --fix ${filenames
//     .map((f) => path.relative(path.join("packages", "hardhat"), f))
//     .join(" ")}`;

// module.exports = {
//   "packages/nextjs/**/*.{ts,tsx}": [
//     buildNextEslintCommand,
//     checkTypesNextCommand,
//   ],
//   "packages/hardhat/**/*.{ts,tsx}": [buildHardhatEslintCommand],
// };

const path = require("path");

// Exclude auto-generated Next.js types from linting
const nextExclude = [
  "next-env.d.ts",
  ".next",
];

const buildNextEslintCommand = (filenames) => {
  // Filter out excluded files
  const filtered = filenames.filter((file) => {
    return !nextExclude.some((ex) => file.includes(ex));
  });

  if (filtered.length === 0) return [];

  return `yarn next:lint --fix --file ${filtered
    .map((f) => path.relative(path.join("packages", "nextjs"), f))
    .join(" --file ")}`;
};

const checkTypesNextCommand = () => "yarn next:check-types";

const buildHardhatEslintCommand = (filenames) =>
  `yarn hardhat:lint-staged --fix ${filenames
    .map((f) => path.relative(path.join("packages", "hardhat"), f))
    .join(" ")}`;

module.exports = {
  "packages/nextjs/**/*.{ts,tsx}": [
    buildNextEslintCommand,
    checkTypesNextCommand,
  ],
  "packages/hardhat/**/*.{ts,tsx}": [buildHardhatEslintCommand],
};
