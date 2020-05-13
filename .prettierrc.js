module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  insertPragma: false,
  jsxBracketSameLine: false,
  printWidth: 120,
  proseWrap: 'always',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: '*.json',
      options: {
        tabWidth: 2,
        singleQuote: false
      }
    }
  ]
};