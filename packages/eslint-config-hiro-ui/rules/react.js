module.exports = {
  rules
  /**
   * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/forbid-prop-types.md
   */
    : {
    'react/forbid-prop-types': ['warn', {
      forbid: [
        'any',
      ],
    }],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-children-prop.md
     */
    'react/no-children-prop': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-danger.md
     */
    'react/no-danger': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-deprecated.md
     */
    'react/no-deprecated': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-did-mount-set-state.md
     */
    'react/no-did-mount-set-state': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-did-update-set-state.md
     */
    'react/no-did-update-set-state': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-direct-mutation-state.md
     */
    'react/no-direct-mutation-state': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-multi-comp.md
     */
    'react/no-multi-comp': ['warn', {
      ignoreStateless: true,
    }],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-redundant-should-component-update.md
     */
    'react/no-redundant-should-component-update': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-render-return-value.md
     */
    'react/no-render-return-value': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-string-refs.md
     */
    'react/no-string-refs': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-unescaped-entities.md
     */
    'react/no-unescaped-entities': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-unknown-property.md
     */
    'react/no-unknown-property': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/no-will-update-set-state.md
     */
    'react/no-will-update-set-state': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/prefer-es6-class.md
     */
    'react/prefer-es6-class': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/prefer-stateless-function.md
     */
    'react/prefer-stateless-function': ['warn', {
      ignorePureComponents: true,
    }],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/prop-types.md
     */
    'react/prop-types': ['warn', {
      skipUndeclared: true,
    }],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/react-in-jsx-scope.md
     */
    'react/react-in-jsx-scope': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/require-render-return.md
     */
    'react/require-render-return': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/self-closing-comp.md
     */
    'react/self-closing-comp': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/void-dom-elements-no-children.md
     */
    'react/void-dom-elements-no-children': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-boolean-value.md
     */
    'react/jsx-boolean-value': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-closing-bracket-location.md
     */
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-closing-tag-location.md
     */
    'react/jsx-closing-tag-location': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-curly-spacing.md
     */
    'react/jsx-curly-spacing': ['warn', 'never'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-equals-spacing.md
     */
    'react/jsx-equals-spacing': ['warn', 'never'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-first-prop-new-line.md
     */
    'react/jsx-first-prop-new-line': ['warn', 'multiline'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-indent.md
     */
    'react/jsx-indent': ['warn', 2],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-indent-props.md
     */
    'react/jsx-indent-props': ['warn', 2],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-key.md
     */
    'react/jsx-key': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-max-props-per-line.md
     */
    'react/jsx-max-props-per-line': ['warn', {
      when: 'multiline',
    }],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-no-bind.md
     */
    'react/jsx-no-bind': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-no-duplicate-props.md
     */
    'react/jsx-no-duplicate-props': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-no-undef.md
     */
    'react/jsx-no-undef': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-pascal-case.md
     */
    'react/jsx-pascal-case': ['warn', {
      allowAllCaps: true,
    }],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-tag-spacing.md
     */
    'react/jsx-tag-spacing': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-uses-react.md
     */
    'react/jsx-uses-react': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-uses-vars.md
     */
    'react/jsx-uses-vars': ['warn'],

    /**
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/v7.1.0/docs/rules/jsx-wrap-multilines.md
     */
    'react/jsx-wrap-multilines': ['warn'],
  },
};
