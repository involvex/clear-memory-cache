# clear-memory-cache

> A CLI tool to clear Windows caches and standby memory via Rammap (Sysinternals).

## Prerequisites

- **Rammap** must be installed and available in PATH ([Sysinternals RAMMap](https://learn.microsoft.com/en-us/sysinternals/downloads/rammap))
- Windows (PowerShell / Windows Terminal)

## Install

```bash
npm install --global clear-memory-cache
```

## Usage

```
$ clear-memory-cache <command> [options]
$ cmc <command> [options]
```

## Commands

| Command                | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| `memory-clear`         | Empty all process working sets (`rammap -Et`)                        |
| `cache-clear`          | Empty system working set / caches (`rammap -Es`)                     |
| `empty-standby-memory` | Empty standby list (`rammap -E0`)                                    |
| `clear-pm-cache`       | Clear package manager caches (see options below)                     |
| `clear-all`            | Run `memory-clear` + `empty-standby-memory` + `clear-pm-cache --all` |
| `smart-clear`          | Analyze memory and clear only what is necessary                      |
| `version`              | Show version number                                                  |
| `about`                | Show package info                                                    |
| `help`                 | Show help                                                            |

## clear-pm-cache options

| Flag     | Runs                      |
| -------- | ------------------------- |
| `--bun`  | `bun pm cache rm -g`      |
| `--npm`  | `npm cache rm -g --force` |
| `--pnpm` | `pnpm cache delete`       |
| `--yarn` | `yarn cache clean`        |
| `--all`  | All of the above          |

## smart-clear thresholds

| Free RAM | Status      | Action                                            |
| -------- | ----------- | ------------------------------------------------- |
| < 10%    | 🚨 CRITICAL | memory-clear + empty-standby-memory + cache-clear |
| 10–20%   | ⚠️ LOW      | empty-standby-memory + cache-clear                |
| 20–40%   | 🟡 MODERATE | cache-clear                                       |
| > 40%    | ✅ HEALTHY  | No action needed                                  |

## Examples

```bash
cmc memory-clear
cmc cache-clear
cmc empty-standby-memory
cmc clear-pm-cache --npm
cmc clear-pm-cache --all
cmc clear-all
cmc smart-clear
clear-memory-cache clear-pm-cache --all
clear-memory-cache empty-standby-memory
```
