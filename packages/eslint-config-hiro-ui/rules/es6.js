module.exports = {
  rules: {
    /**
     * @see http://eslint.org/docs/rules/arrow-parens
     */
    'arrow-parens': ['warn', 'as-needed', {
      requireForBlockBody: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/arrow-spacing
     */
    'arrow-spacing': ['warn', {
      'before': true,
      'after': true,
    }],

    /**
     * @see http://eslint.org/docs/rules/constructor-super
     */
    'constructor-super': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-class-assign
     */
    'no-class-assign': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-const-assign
     */
    'no-const-assign': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-dupe-class-members
     */
    'no-dupe-class-members': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-duplicate-imports
     */
    'no-duplicate-imports': ['warn', {
      includeExports: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/no-new-symbol
     */
    'no-new-symbol': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-this-before-super
     */
    'no-this-before-super': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-useless-computed-key
     */
    'no-useless-computed-key': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-useless-constructor
     */
    'no-useless-constructor': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-useless-rename
     */
    'no-useless-rename': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-var
     */
    'no-var': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/object-shorthand
     */
    'object-shorthand': ['warn', 'always', {
      avoidQuotes: true,
      ignoreConstructors: true,
      avoidExplicitReturnArrows: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/prefer-arrow-callback
     */
    'prefer-arrow-callback': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/prefer-const
     */
    'prefer-const': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/prefer-destructuring
     */
    'prefer-destructuring': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/prefer-numeric-literals
     */
    'prefer-numeric-literals': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/prefer-rest-params
     */
    'prefer-rest-params': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/prefer-spread
     */
    'prefer-spread': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/prefer-template
     */
    'prefer-template': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/rest-spread-spacing
     */
    'rest-spread-spacing': ['warn', 'never'],

    /**
     * @see http://eslint.org/docs/rules/symbol-description
     */
    'symbol-description': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/template-curly-spacing
     */
    'template-curly-spacing': ['warn', 'never'],
  },
};
