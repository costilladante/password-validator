module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss', // disables rules that conflict with Prettier
  ],
  plugins: ['stylelint-scss'],
  rules: {
    // Naming convention
    'scss/dollar-variable-pattern': '^[_a-z]+[a-zA-Z0-9-]*$',
    'scss/percent-placeholder-pattern': '^[_a-z]+[a-zA-Z0-9-]*$',

    // Limit nesting
    'max-nesting-depth': 3,

    // Disallow vendor prefixes (let autoprefixer handle them)
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
  },
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/*.ts',
    '**/*.tsx',
    '**/*.js',
    '**/*.json',
  ],
}
