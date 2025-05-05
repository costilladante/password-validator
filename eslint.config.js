import eslintJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintReact from "@eslint-react/eslint-plugin";
import prettier from 'eslint-config-prettier/flat';

export default [
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintReact.configs["recommended-typescript"],
  prettier,
  {
    ignores: ['dist',
      'build',
      'node_modules',
      '*.config.js',
      '*.config.cjs',
      'vite-env.d.ts',
      'vite.config.ts',
      'vitest.config.ts',]
  },
  {
    files: ['**/*.{ts,tsx}'],
  },
  {
    languageOptions: {
      // Use TypeScript ESLint parser for TypeScript files
      parser: tseslint.parser,
      parserOptions: {
        // Enable project service for better TypeScript integration
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    }
  },
  {
    // Custom rule overrides (modify rule levels or disable rules)
    rules: {
      // Airbnb base style
      'array-bracket-spacing': ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'eol-last': ['error', 'always'],
      'eqeqeq': ['error', 'always'],
      'func-call-spacing': ['error', 'never'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-console': 'warn',
      'no-const-assign': 'error',
      'no-duplicate-imports': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-param-reassign': ['error', { props: true }],
      'no-unused-vars': 'off', // handled by TS
      '@typescript-eslint/no-unused-vars': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'prefer-const': 'error',
      'quotes': ['error', 'single', { avoidEscape: true }],

      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'spaced-comment': ['error', 'always', { markers: ['/'] }],
      // React/TS/Prettier/Custom
      "@eslint-react/no-missing-key": "error",
    },
  }
]
