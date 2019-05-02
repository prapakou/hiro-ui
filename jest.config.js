const esModules = ["lodash-es"].join("");

module.exports = {
  transform: {
    ".(ts|tsx)": "ts-jest",
    [`(${esModules}).+\\.js$`]: "babel-jest"
  },
  moduleNameMapper: {
    "^lodash-es$": "lodash"
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  testPathIgnorePatterns: ["/node_modules/", "/lib/"],
  testRegex: "(/tests/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
