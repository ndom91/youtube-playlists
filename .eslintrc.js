module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    ecmaFeatures:  {
      jsx:  true,
    }
  },
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // for now - we can go more strict later
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'react/display-name': 'off',
    'react/no-find-dom-node': 'off',
    'react/no-unescaped-entities': 'off'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  overrides: [
    {
        "files": ["**/*.tsx", "**/*.js"],
        "rules": {
            "react/prop-types": "off"
        }
    }
  ]
}