module.exports = {
  rules: {

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/default.md
     */
    'import/default': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/namespace.md
     */
    'import/namespace': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/no-absolute-path.md
     */
    'import/no-absolute-path': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/export.md
     */
    'import/export': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/no-named-as-default.md
     */
    'import/no-named-as-default': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/no-named-as-default-member.md
     */
    'import/no-named-as-default-member': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/no-nodejs-modules.md
     */
    'import/no-nodejs-modules': ['warn', {
      allow: [
        'events',
      ],
    }],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/first.md
     */
    'import/first': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/no-duplicates.md
     */
    'import/no-duplicates': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/order.md
     */
    'import/order': ['warn', {
      groups: [
        'builtin',
        'external',
        [
          'parent',
          'sibling',
          'index',
        ],
      ],
    }],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/newline-after-import.md
     */
    'import/newline-after-import': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/no-named-default.md
     */
    'import/no-named-default': ['warn'],

    /**
     * @see https://github.com/benmosher/eslint-plugin-import/blob/v2.7.0/docs/rules/no-anonymous-default-export.md
     */
    'import/no-anonymous-default-export': ['warn'],
  },
};
