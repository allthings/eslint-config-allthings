module.export = {
  extends: [
    '@allthings/default',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      {
        children: 'never',
        props: 'never',
      },
    ],
    'react/jsx-sort-props': [
      2,
      {
        noSortAlphabetically: false,
      },
    ],
  },
}
