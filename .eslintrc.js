module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['public'],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.mjs'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.test.tsx', 'jest.setup.ts', 'test/**'] },
    ],
    'import/prefer-default-export': 0,
    'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['draft', 'state'], props: true }],
    'no-shadow': 0,
    'no-use-before-define': 'off',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
  },
};
