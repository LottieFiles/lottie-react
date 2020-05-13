module.exports = {
  env: { browser: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-config-prettier and eslint-plugin-prettier
    'plugin:react/recommended', // Uses the recommended rules from eslint-plugin-react
    'plugin:react-hooks/recommended', // Uses the recommended rules from eslint-plugin-react-hooks
    'plugin:jsx-a11y/recommended', // Uses the recommended rules from eslint-plugin-jsx-a11y
    'prettier/react', // Disable rules that would conflict with prettier
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    // Disable sorting rules to not conflict with simple-import-sort
    'sort-imports': 'off',

    // Enable the simple-import-sort rule
    'simple-import-sort/sort': 'error',

    // Disable some preference rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },

    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true,
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
};
