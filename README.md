# frontend-template

This is a basic setup for projects using React and TypeScript.  
I keep it on GitHub for easy access, feel free to use it for anything you want.

## Frameworks & Languages

* React 17
* Tailwind 2
* TypeScript 4

## Tooling

* esbuild
* Jest (with `ts-jest`)
* ESLint with recommended rules
* Prettier

# Usage

Main entry is `src/js/main.tsx`, I have added a component just for testing purposes.

You can run a simple dev server with `yarn start` and go to the URI esbuild announces in the console.  
This will run both `esbuild` and `postcss` in watch mode.

# Tests

You can place tests in `src/*.test.ts(x)` or in `tests/*.test.ts(x)`,
Jest runs with `ts-jest` so your tests needs to be correctly typed.

React Testing Library is included with the additional `@testing-library/jest-dom`
library to support more browser aligned tests.

`msw` is used to mock the network layer.
