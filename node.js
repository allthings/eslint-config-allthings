/*
 * @rushstack/eslint-patch is used to include plugins as dev
 * dependencies instead of imposing them as peer dependencies
 *
 * https://www.npmjs.com/package/@rushstack/eslint-patch
 */
const keptPaths = []
const sortedPaths = []
const cwd = process.cwd().replace(/\\/g, '/')
const originalPaths = require.resolve.paths('eslint-plugin-import')

// eslint throws a conflict error when plugins resolve to different
// locations, since we want to lock our dependencies by default
// but also need to allow using user dependencies this updates
// our resolve paths to first check the cwd and iterate to
// eslint-config-next's dependencies if needed

for (const currentPath of originalPaths) {
  if (currentPath.replace(/\\/g, '/').startsWith(cwd)) {
    sortedPaths.push(currentPath)
  } else {
    keptPaths.unshift(currentPath)
  }
}

// maintain order of node_modules outside cwd
sortedPaths.push(...keptPaths.reverse())

const hookPropertyMap = new Map(
  [
    ['eslint-plugin-unicorn', 'eslint-plugin-unicorn'],
    ['eslint-plugin-jest', 'eslint-plugin-jest'],
    ['eslint-plugin-import', 'eslint-plugin-import'],
    [
      'eslint-plugin-typescript-sort-keys',
      'eslint-plugin-typescript-sort-keys',
    ],
    ['eslint-plugin-prefer-arrow', 'eslint-plugin-prefer-arrow'],
    ['eslint-plugin-simple-import-sort', 'eslint-plugin-simple-import-sort'],
    ['@stylistic/eslint-plugin', '@stylistic/eslint-plugin'],
  ].map(([request, replacement]) => [
    request,
    require.resolve(replacement, { paths: sortedPaths }),
  ]),
)

const mod = require('module')
const resolveFilename = mod._resolveFilename
mod._resolveFilename = function (request, parent, isMain, options) {
  const hookResolved = hookPropertyMap.get(request)
  if (hookResolved) {
    request = hookResolved
  }
  return resolveFilename.call(mod, request, parent, isMain, options)
}

require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:typescript-sort-keys/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@stylistic',
    'unicorn',
    'jest',
    'import',
    'typescript-sort-keys',
    'prefer-arrow',
    'simple-import-sort',
  ],
  rules: {
    '@stylistic/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@stylistic/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/type-annotation-spacing': 'error',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/no-base-to-string': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': [
      'warn', // TODO: strict later
      {
        allowArgumentsExplicitlyTypedAsAny: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowHigherOrderFunctions: false,
        allowTypedFunctionExpressions: false,
      },
    ],
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
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'warn',
    '@typescript-eslint/no-require-imports': 'warn',
    '@typescript-eslint/no-shadow': [
      'error',
      {
        hoist: 'all',
      },
    ],
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-promise-reject-errors': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'warn',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'always',
        types: 'prefer-import',
        lib: 'always',
      },
    ],
    '@typescript-eslint/typedef': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    complexity: [
      'error',
      {
        max: 15,
      },
    ],
    'constructor-super': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-denylist': [
      'error',
      'any',
      'Number',
      'number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
      'undefined',
    ],
    'id-match': 'error',
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
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'max-classes-per-file': ['error', 1],
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-multiple-empty-lines': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-redeclare': 'error',
    'no-return-await': 'error',
    'no-sequences': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    'prefer-arrow/prefer-arrow-functions': 'warn',
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    radix: 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-keys': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'unicorn/better-regex': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/filename-case': [
      'warn',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/import-style': 'warn',
    'unicorn/no-anonymous-default-export': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-console-spaces': 'off',
    'unicorn/no-document-cookie': 'warn',
    'unicorn/no-empty-file': 'off',
    'unicorn/no-hex-escape': 'warn',
    'unicorn/no-invalid-remove-event-listener': 'warn',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-object-as-default-parameter': 'warn',
    'unicorn/no-single-promise-in-promise-methods': 'warn',
    'unicorn/no-unreadable-array-destructuring': 'off',
    'unicorn/no-unsafe-regex': 'off',
    'unicorn/no-unused-properties': 'warn',
    'unicorn/no-zero-fractions': 'off',
    'unicorn/prefer-export-from': 'off',
    'unicorn/prefer-global-this': 'warn',
    'unicorn/prefer-includes': 'off',
    'unicorn/prefer-math-min-max': 'warn',
    'unicorn/prefer-module': 'warn',
    'unicorn/prefer-optional-catch-binding': 'off',
    'unicorn/prefer-prototype-methods': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-regexp-test': 'off',
    'unicorn/prefer-set-has': 'off',
    'unicorn/prefer-set-size': 'off',
    'unicorn/prefer-string-raw': 'off',
    'unicorn/prefer-string-replace-all': 'off',
    'unicorn/prefer-structured-clone': 'warn',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/relative-url-style': 'off',
    'unicorn/switch-case-braces': 'off',
    'unicorn/template-indent': 'off',
    'use-isnan': 'error',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    project: 'tsconfig.json',
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  settings: {
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: [
        '.ts',
        '.mts',
        '.cts',
        '.tsx',
        '.d.ts',
      ],
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    node: true,
    es6: true,
    'jest/globals': true,
  },
  globals: {
    describe: true,
    expect: true,
    fetch: false,
    it: true,
    jest: true,
    MutationObserver: true,
  },
  overrides: [
    {
      // because of jest
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
      },
    },
  ],
  root: true,
}
