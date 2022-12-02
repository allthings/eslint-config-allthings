module.export = {
  parser: '@typescript-eslint/parser',
  // Specifies the ESLint parser
  parserOptions: {
    // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    ecmaVersion: 2020,
    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
  ],
  plugins: ['typescript-sort-keys', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        custom: {
          match: true,
          regex: '^I[A-Z]',
        },
        format: ['PascalCase'],
        selector: 'interface',
      },
    ],
    'import/no-anonymous-default-export': [
      'error',
      {
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowArray: false,
        allowArrowFunction: true,
        allowCallExpression: true,
        // The true value here is for backward compatibility
        allowLiteral: false,
        allowObject: true,
      },
    ],
    'no-console': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': 'error',
  },
}
