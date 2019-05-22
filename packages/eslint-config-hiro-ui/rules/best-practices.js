module.exports = {
  rules: {
    /**
     * @see http://eslint.org/docs/rules/array-callback-return
     */
    'array-callback-return': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/block-scoped-var
     */
    'block-scoped-var': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/complexity
     */
    'complexity': ['warn', {
      max: 15,
    }],

    /**
     * @see http://eslint.org/docs/rules/consistent-return
     */
    'consistent-return': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/curly
     */
    'curly': ['warn', 'all'],

    /**
     * @see http://eslint.org/docs/rules/dot-location
     */
    'dot-location': ['warn', 'property'],

    /**
     * @see http://eslint.org/docs/rules/dot-notation
     */
    'dot-notation': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/eqeqeq
     */
    'eqeqeq': ['warn', 'smart'],

    /**
     * @see http://eslint.org/docs/rules/no-caller
     */
    'no-caller': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-case-declarations
     */
    'no-case-declarations': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-else-return
     */
    'no-else-return': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-empty-function
     */
    'no-empty-function': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-empty-pattern
     */
    'no-empty-pattern': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-eval
     */
    'no-eval': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-extend-native
     */
    'no-extend-native': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-extra-bind
     */
    'no-extra-bind': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-extra-label
     */
    'no-extra-label': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-fallthrough
     */
    'no-fallthrough': ['warn', {
      commentPattern: 'fall|break',
    }],

    /**
     * @see http://eslint.org/docs/rules/no-global-assign
     */
    'no-global-assign': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-implicit-coercion
     */
    'no-implicit-coercion': ['warn', {
      boolean: true,
      number: true,
      string: true,
      allow: [
        '!!',
      ],
    }],

    /**
     * @see http://eslint.org/docs/rules/no-implicit-globals
     */
    'no-implicit-globals': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-implied-eval
     */
    'no-implied-eval': ['warn'],

    /**
     * "babel/" prefix was added due es6 parsing
     *
     * @see https://github.com/babel/eslint-plugin-babel/tree/v4.1.1
     * @see http://eslint.org/docs/rules/no-invalid-this
     */
    'babel/no-invalid-this': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-lone-blocks
     */
    'no-lone-blocks': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-loop-func
     */
    'no-loop-func': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-magic-numbers
     */
    'no-magic-numbers': ['warn', {
      ignore: [
        -1,
        0,
        1,
        2,
        7,
        24,
        30,
        60,
        100,
        365,
        1000,
      ],
      ignoreArrayIndexes: true,
      enforceConst: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/no-multi-spaces
     */
    'no-multi-spaces': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-multi-str
     */
    'no-multi-str': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-new
     */
    'no-new': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-new-func
     */
    'no-new-func': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-new-wrappers
     */
    'no-new-wrappers': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-octal
     */
    'no-octal': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-octal-escape
     */
    'no-octal-escape': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-restricted-properties
     */
    'no-restricted-properties': ['warn', {
      property: '__defineGetter__',
      message: 'Please use Object.defineProperty instead.',
    }, {
      property: '__defineSetter__',
      message: 'Please use Object.defineProperty instead.',
    }, {
      object: 'Math',
      property: 'pow',
      message: 'Use the exponentiation operator (**) instead.',
    }],

    /**
     * @see http://eslint.org/docs/rules/no-return-assign
     */
    'no-return-assign': ['warn', 'except-parens'],

    /**
     * @see http://eslint.org/docs/rules/no-return-await
     */
    'no-return-await': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-self-assign
     */
    'no-self-assign': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-self-compare
     */
    'no-self-compare': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-sequences
     */
    'no-sequences': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-unmodified-loop-condition
     */
    'no-unmodified-loop-condition': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-unused-expressions
     */
    'no-unused-expressions': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-with
     */
    'no-with': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/require-await
     */
    'require-await': ['warn'],
  },
};
