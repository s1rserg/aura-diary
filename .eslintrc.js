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
      alias: {
        map: [['~', './src/']],
        extensions: ['.ts', '.js', '.tsx'],
      },
    },
  },
  rules: {
    'no-undef': 'error',
    'import/no-cycle': 'warn',
    'import/no-self-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'warn',
    'import/no-relative-packages': 'error',

    // Possible Errors
    'no-console': 'warn', // warn on console.log usage
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // error on unused vars except _args
    'no-empty': 'error', // disallow empty blocks
    'no-duplicate-case': 'error', // no duplicate case labels
    'no-fallthrough': 'error', // prevent case fallthrough
    'no-unreachable': 'error',

    // Best Practices
    eqeqeq: ['error', 'always'], // require === and !==
    curly: 'error', // require curly braces for blocks
    'no-eval': 'error', // disallow eval()
    'no-implied-eval': 'error',
    'consistent-return': 'warn', // consistent return in functions
    'no-multi-spaces': 'error', // disallow multiple spaces
    'no-var': 'error', // prefer let/const over var
    'prefer-const': 'warn', // prefer const if variable never reassigned

    // Stylistic
    semi: ['error', 'always'], // require semicolons
    quotes: ['error', 'single', { avoidEscape: true }], // prefer single quotes
    'comma-dangle': ['error', 'always-multiline'], // trailing commas in multiline
    indent: ['error', 2, { SwitchCase: 1 }], // 2 spaces indent
    'linebreak-style': ['error', 'unix'], // enforce LF line endings

    // Import plugin additions
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.spec.ts'] },
    ],
    'import/newline-after-import': 'warn',
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
  env: {
    browser: true,
    node: true,
  },
};
