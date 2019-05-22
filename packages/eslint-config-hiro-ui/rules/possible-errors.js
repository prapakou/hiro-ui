module.exports = {
  rules: {

    /**
     * @see http://eslint.org/docs/rules/no-cond-assign
     */
    'no-cond-assign': ['warn', 'except-parens'],

    /**
     * @see http://eslint.org/docs/rules/no-constant-condition
     */
    'no-constant-condition': ['warn', {
      checkLoops: false,
    }],

    /**
     * @see http://eslint.org/docs/rules/no-control-regex
     */
    'no-control-regex': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-dupe-args
     */
    'no-dupe-args': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-dupe-keys
     */
    'no-dupe-keys': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-duplicate-case
     */
    'no-duplicate-case': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-empty
     */
    'no-empty': ['warn', {
      allowEmptyCatch: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/no-extra-boolean-cast
     */
    'no-extra-boolean-cast': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-extra-parens
     */
    'no-extra-parens': ['warn', 'all', {
      conditionalAssign: false,
      returnAssign: false,
      nestedBinaryExpressions: false,
      ignoreJSX: 'multi-line',
    }],

    /**
     * @see http://eslint.org/docs/rules/no-extra-semi
     */
    'no-extra-semi': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-func-assign
     */
    'no-func-assign': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-inner-declarations
     */
    'no-inner-declarations': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-invalid-regexp
     */
    'no-invalid-regexp': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-irregular-whitespace
     */
    'no-irregular-whitespace': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-prototype-builtins
     */
    'no-prototype-builtins': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-regex-spaces
     */
    'no-regex-spaces': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-sparse-arrays
     */
    'no-sparse-arrays': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-unexpected-multiline
     */
    'no-unexpected-multiline': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-unsafe-finally
     */
    'no-unsafe-finally': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-unsafe-negation
     */
    'no-unsafe-negation': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/use-isnan
     */
    'use-isnan': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/valid-typeof
     */
    'valid-typeof': ['warn', {
      requireStringLiterals: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/yoda
     */
    'yoda': ['warn', 'never'],
  },
};
