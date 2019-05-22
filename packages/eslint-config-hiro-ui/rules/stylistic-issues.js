const blocksPadding = require('../lib/blocks-padding');

module.exports = {
  rules: {

    /**
     * @see http://eslint.org/docs/rules/array-bracket-spacing
     */
    'array-bracket-spacing': ['warn', 'never'],

    /**
     * @see http://eslint.org/docs/rules/block-spacing
     */
    'block-spacing': ['warn', 'always'],

    /**
     * @see http://eslint.org/docs/rules/brace-style
     */
    'brace-style': ['warn', '1tbs'],

    /**
     * @see http://eslint.org/docs/rules/camelcase
     */
    'camelcase': ['warn', {
      properties: 'never',
    }],

    /**
     * @see http://eslint.org/docs/rules/comma-dangle
     */
    'comma-dangle': ['warn', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore',
    }],

    /**
     * @see http://eslint.org/docs/rules/comma-spacing
     */
    'comma-spacing': ['warn', {
      before: false,
      after: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/comma-style
     */
    'comma-style': ['warn', 'last'],

    /**
     * @see http://eslint.org/docs/rules/computed-property-spacing
     */
    'computed-property-spacing': ['warn', 'never'],

    /**
     * @see http://eslint.org/docs/rules/eol-last
     */
    'eol-last': ['warn', 'always'],

    /**
     * @see http://eslint.org/docs/rules/func-call-spacing
     */
    'func-call-spacing': ['warn', 'never'],

    /**
     * @see http://eslint.org/docs/rules/func-names
     */
    'func-names': ['warn', 'as-needed'],

    /**
     * @see http://eslint.org/docs/rules/indent
     */
    'indent': ['warn', 2, {
      SwitchCase: 1,
    }],

    /**
     * @see http://eslint.org/docs/rules/jsx-quotes
     */
    'jsx-quotes': ['warn', 'prefer-double'],

    /**
     * @see http://eslint.org/docs/rules/key-spacing
     */
    'key-spacing': ['warn', {
      beforeColon: false,
      afterColon: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/keyword-spacing
     */
    'keyword-spacing': ['warn', {
      before: true,
      after: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/linebreak-style
     */
    'linebreak-style': ['warn', 'unix'],

    /**
     * @see http://eslint.org/docs/rules/max-depth
     */
    'max-depth': ['warn', {
      max: 4,
    }],

    /**
     * @see http://eslint.org/docs/rules/max-len
     */
    'max-len': ['warn', {
      code: 120,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/max-lines
     */
    'max-lines': ['warn', {
      max: 300,
      skipComments: true,
      skipBlankLines:false,
    }],

    /**
     * @see http://eslint.org/docs/rules/max-nested-callbacks
     */
    'max-nested-callbacks': ['warn', {
      max: 3,
    }],

    /**
     * @see http://eslint.org/docs/rules/max-params
     */
    'max-params': ['warn', {
      max: 3,
    }],

    /**
     * @see http://eslint.org/docs/rules/max-statements-per-line
     */
    'max-statements-per-line': ['warn', {
      max: 1,
    }],

    /**
     * "babel/" prefix was added due es6 parsing
     *
     * @see https://github.com/babel/eslint-plugin-babel/tree/v4.1.1
     * @see http://eslint.org/docs/rules/new-cap
     */
    'babel/new-cap': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/new-parens
     */
    'new-parens': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/newline-per-chained-call
     */
    'newline-per-chained-call': ['warn', {
      ignoreChainWithDepth: 3,
    }],

    /**
     * @see http://eslint.org/docs/rules/no-array-constructor
     */
    'no-array-constructor': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-lonely-if
     */
    'no-lonely-if': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-mixed-spaces-and-tabs
     */
    'no-mixed-spaces-and-tabs': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-multi-assign
     */
    'no-multi-assign': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-multiple-empty-lines
     */
    'no-multiple-empty-lines': ['warn', {
      max: 2,
    }],

    /**
     * @see http://eslint.org/docs/rules/no-negated-condition
     */
    'no-negated-condition': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-nested-ternary
     */
    'no-nested-ternary': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-new-object
     */
    'no-new-object': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-tabs
     */
    'no-tabs': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-trailing-spaces
     */
    'no-trailing-spaces': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-unneeded-ternary
     */
    'no-unneeded-ternary': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-whitespace-before-property
     */
    'no-whitespace-before-property': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/object-curly-newline
     */
    'object-curly-newline': ['warn', {
      consistent: true,
    }],

    /**
     * "babel/" prefix was added due es6 parsing
     *
     * @see https://github.com/babel/eslint-plugin-babel/tree/v4.1.1
     * @see http://eslint.org/docs/rules/object-curly-spacing
     */
    'babel/object-curly-spacing': ['warn', 'always'],

    /**
     * @see http://eslint.org/docs/rules/one-var
     */
    'one-var': ['warn', 'never'],

    /**
     * @see http://eslint.org/docs/rules/one-var-declaration-per-line
     */
    'one-var-declaration-per-line': ['warn', 'always'],

    /**
     * @see http://eslint.org/docs/rules/operator-linebreak
     */
    'operator-linebreak': ['warn', 'after'],

    /**
     * @see http://eslint.org/docs/rules/padded-blocks
     */
    'padded-blocks': ['warn', 'never'],

    /**
     * @see http://eslint.org/docs/rules/padding-line-between-statements
     */
    'padding-line-between-statements': ['warn'].concat(blocksPadding),

    /**
     * @see http://eslint.org/docs/rules/quote-props
     */
    'quote-props': ['warn', 'consistent-as-needed'],

    /**
     * @see http://eslint.org/docs/rules/quotes
     */
    'quotes': ['warn', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],

    /**
     * "babel/" prefix was added due es6 parsing
     *
     * @see https://github.com/babel/eslint-plugin-babel/tree/v4.1.1
     * @see http://eslint.org/docs/rules/semi
     */
    'babel/semi': ['warn', 'always'],

    /**
     * @see http://eslint.org/docs/rules/semi-spacing
     */
    'semi-spacing': ['warn', {
      before: false,
      after: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/spaced-comment
     */
    'spaced-comment': ['warn', 'always', {
      exceptions: [
        '-',
        '*',
      ],
    }],

    /**
     * @see http://eslint.org/docs/rules/space-before-blocks
     */
    'space-before-blocks': ['warn', 'always'],

    /**
     * @see http://eslint.org/docs/rules/space-before-function-paren
     */
    'space-before-function-paren': ['warn', {
      anonymous: 'always',
      asyncArrow: 'always',
      named: 'never',
    }],

    /**
     * @see http://eslint.org/docs/rules/space-in-parens
     */
    'space-in-parens': ['warn', 'never'],

    /**
     * @see http://eslint.org/docs/rules/space-infix-ops
     */
    'space-infix-ops': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/space-unary-ops
     */
    'space-unary-ops': ['warn', {
      words: true,
      nonwords: false,
    }],

    /**
     * @see http://eslint.org/docs/rules/switch-colon-spacing
     */
    'switch-colon-spacing': ['warn', {
      before: false,
      after: true,
    }],

    /**
     * @see http://eslint.org/docs/rules/template-tag-spacing
     */
    'template-tag-spacing': ['warn', 'never'],

    /**
     * @see http://eslint.org/docs/rules/unicode-bom
     */
    'unicode-bom': ['warn', 'never'],
  },
};
