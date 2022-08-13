module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-promise-executor-return': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
  },
};
