function mapResolve(values) {
  return values.map(require.resolve);
}

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["import", "react", "react-hooks"],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: ["plugin:import/typescript", "plugin:@typescript-eslint/recommended"]
    .concat(
      mapResolve([
        "./rules/possible-errors",
        "./rules/best-practices",
        "./rules/variables",
        "./rules/node",
        "./rules/stylistic-issues",
        "./rules/es6",
        "./rules/react",
        "./rules/import",
        "./rules/ts"
      ])
    )
    .concat(["prettier", "prettier/react", "prettier/@typescript-eslint"]),
  rules: {}
};
