module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  customSyntax: 'postcss-html',
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['use', 'forward', 'mixin', 'include', 'extend'] },
    ],
    'selector-class-pattern': '^[a-z][a-z0-9-_]+[a-z0-9]$',
    'scss/percent-placeholder-pattern': '^[a-z][a-z0-9-_]+[a-z0-9]$',
  },
}
