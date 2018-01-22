module.exports = {
  env: {
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  rules: {
    strict: 0
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    allowImportExportEverywhere: false
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn",
    indent: ["warn", 2],
    quotes: ["warn", "double"],
    semi: ["error", "always"]
  }
};
