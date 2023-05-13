// lint-staged.config.js
const { ESLint } = require("eslint");

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const ignoredFiles = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
  return filteredFiles.join(" ");
};

module.exports = {
  "*.{js,jsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    // eslint-disable-next-line
    console.log(filesToLint);
    if (filesToLint.length === 0) return [];
    return [`prettier --write ${filesToLint}`, `eslint --config .eslintrc.json --max-warnings=0 ${filesToLint}`];
  },
  "*.{ts, tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    // eslint-disable-next-line
    console.log(filesToLint);
    if (filesToLint.length === 0) return [];
    return [`prettier --write ${filesToLint}`, `eslint --config .eslintrc.json --max-warnings=0 ${filesToLint}`];
  },
};
