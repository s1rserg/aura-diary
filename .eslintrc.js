module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        // Paths to all subproject tsconfigs
        project: ['./client/tsconfig.json', './server/tsconfig.json'],
      },
    },
  },
  rules: {
    'no-undef': 'error',
    'import/no-cycle': 'warn',
    'import/no-extraneous-dependencies': 'error',
    'import/no-self-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'warn',
    'import/no-relative-packages': 'error',
  },
  overrides: [
    {
      files: ['client/**/*.ts', 'client/**/*.tsx'],
      parserOptions: {
        project: './client/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    {
      files: ['server/**/*.ts', 'server/**/*.tsx'],
      parserOptions: {
        project: './server/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
