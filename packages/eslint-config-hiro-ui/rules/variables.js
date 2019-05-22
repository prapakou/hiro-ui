const restrictedGlobals = require('../lib/restricted-globals');

module.exports = {
  rules: {

    /**
     * @see http://eslint.org/docs/rules/no-delete-var
     */
    'no-delete-var': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-restricted-globals
     */
    'no-restricted-globals': ['warn'].concat(restrictedGlobals),

    /**
     * @see http://eslint.org/docs/rules/no-undef
     */
    'no-undef': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-undef-init
     */
    'no-undef-init': ['warn'],

    /**
     * @see http://eslint.org/docs/rules/no-unused-vars
     */
    'no-unused-vars': ['warn'],
  },
};
