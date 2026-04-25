# AGENTS.md — clear-memory-cache

## Quick Start

- Install deps: `bun install` (or `npm install`)
- Dev mode: `npm run dev` (executes `src/cli.tsx` directly via Bun)
- Build: `npm run build` → outputs to `dist/src/cli.js`
- Run built CLI: `npm run start` or `node dist/cli.js`
- All checks: `npm run test` (prettier → xo → ava, all must pass)

## Architecture

- Windows-only CLI tool; requires [Rammap](https://learn.microsoft.com/en-us/sysinternals/downloads/rammap) in PATH.
- Entry: `src/cli.tsx` (meow) → routes to React+Ink components in `src/commands/`.
- ES Modules (`"type": "module"`) with `"module": "Node16"` in tsconfig.
- All source imports use **`.js` extensions** even for TypeScript files (e.g., `./commands/about.js`).

## Development

- Runtime is **Bun** — use `bun` commands, not `node` for direct execution.
- `npm run dev` = `bun run src/cli.tsx` (esbuild-style, no compilation).
- TypeScript config extends `@sindresorhus/tsconfig`; `jsx: "react-jsx"`.
- Linting via ESLint + TypeScript-ESLint + `xo-react` preset.

## Building

- `npm run build` = `tsc` (outputs to `dist/`).
- `prebuild` hook runs automatically: `format` → `lint:fix` → `typecheck`.
- `format` uses Prettier with custom config (80 width, singleAttributePerLine, import plugins).

## Testing

- Tests use **ava** with `--loader=ts-node/esm` (see `ava.nodeArguments` in package.json).
- Test files import compiled `.js` outputs (e.g., `./src/app.js` not `.tsx`).
- `npm run test` runs: prettier check → xo → ava (fails if any step fails).
- Test utilities: `ink-testing-library` + `chalk`.

## Code Style

- `.editorconfig`: **tabs** for code, 2-space indent for YAML.
- Prettier: configured via `.prettierrc` + 3 plugins (organize-imports, packagejson, sort-imports).
- Never commit without passing `npm run test`.

## Prerequisites

- **Rammap** (Sysinternals) installed and available in Windows PATH.
- Windows environment (PowerShell / Windows Terminal).
- Node >= 16.

## References

- See `CLAUDE.md` for full command list and architecture details.
- See `README.md` for user-facing commands and usage examples.
- Config sources: `package.json`, `tsconfig.json`, `eslint.config.ts`, `.prettierrc`, `.editorconfig`.
