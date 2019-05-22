module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'babel',
    'import',
    'react',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },
  settings: {
    'import/resolver': 'webpack',
  },
  extends: mapResolve([
    './rules/possible-errors',
    './rules/best-practices',
    './rules/variables',
    './rules/node',
    './rules/stylistic-issues',
    './rules/es6',
    './rules/react',
    './rules/import',
  ]),
  rules: {},
};

function mapResolve(values) {
  return values.map(require.resolve);
}
