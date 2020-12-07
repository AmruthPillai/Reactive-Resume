module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
};
