module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint']
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '11',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
