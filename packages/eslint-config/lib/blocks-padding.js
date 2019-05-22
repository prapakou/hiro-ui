module.exports = [
  // Always require blank lines after import...
  {
    blankLine: 'always',
    prev: 'import',
    next: '*',
  },
  // Except between imports
  {
    blankLine: 'any',
    prev: 'import',
    next: 'import',
  },

  // Always require blank lines before and after every sequence of variable declarations and export
  {
    blankLine: 'always',
    prev: '*',
    next: [
      'const',
      'let',
      'export',
    ],
  },
  {
    blankLine: 'always',
    prev: [
      'const',
      'let',
      'export',
    ],
    next: '*',
  },
  {
    blankLine: 'any',
    prev: [
      'const',
      'let',
      'export',
    ],
    next: [
      'const',
      'let',
      'export',
    ],
  },

  // Always require blank lines before and after class declaration, if, do/while, switch, try
  {
    blankLine: 'always',
    prev: '*',
    next: [
      'if',
      'class',
      'for',
      'do',
      'while',
      'switch',
      'try',
    ],
  },
  {
    blankLine: 'always',
    prev:  [
      'if',
      'class',
      'for',
      'do',
      'while',
      'switch',
      'try',
    ],
    next: '*',
  },

  // Always require blank lines before return statements
  {
    blankLine: 'always',
    prev: '*',
    next: 'return',
  },
];
