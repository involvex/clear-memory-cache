# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Setup:**

- `bun install` or `npm install` - Install dependencies

**Running:**

- `npm run dev` - Run in development mode (executes source directly via Bun)
- `npm run build` - Compile TypeScript to `dist/`
- `npm run start` - Run the built CLI (`dist/src/cli.js`)
- `npm run clean` - Remove the dist directory

**Code Quality:**

- `npm run lint` - Run ESLint on src
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run typecheck` - TypeScript type checking (no emit)
- `npm run test` - Run all tests (prettier check, xo, ava)

**Note:** The `prebuild` script runs format, lint:fix, and typecheck automatically before building.

## Architecture

This is a Windows CLI tool called "clear-memory-cache" (alias: `cmc`) for clearing Windows memory caches and standby memory.

**Tech Stack:**

- Bun as package manager and development runtime
- TypeScript with ES Modules (`"type": "module"`)
- React with Ink for terminal UI rendering
- meow for CLI argument parsing and help generation

**CLI Entry Point:** `src/cli.tsx`

- Uses meow to parse arguments and route commands
- Binary outputs to `dist/src/cli.js`
- Two executable names: `clear-memory-cache` and `cmc`

**Command Pattern:**
Each command is a separate React component in `src/commands/`:

- `help.tsx` - Shows usage information
- `about.tsx` - Shows project metadata
- `version.tsx` - Shows version number
- Commands are routed via `cli.input[0]` in cli.tsx

**Component Structure:**

- Functional components with TypeScript types
- Use Ink's `<Box>` for layout and `<Text>` for content
- Import with `.js` extensions (ES Module resolution)

**Type Definitions:**

- `src/commands/types/index.ts` contains shared types
- Uses `@sindresorhus/tsconfig` as base TypeScript configuration

**Planned but Not Implemented:**
The CLI help shows these commands which are not yet implemented:

- `memory-clear`
- `cache-clear`
- `empty-standby-memory`
- `clear-pm-cache --bun/npm/pnpm/yarn/all`

**Build Output:**

- Compiled to `dist/src/cli.js`
- Requires Node.js >=16
