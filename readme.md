# clear-memory-cache

> A Cli tool to clear windows caches, standby memory. (Utilizes Rammap: Rammap -Et, Rammap -E0)

## Install

```bash
$ npm install --global clear-memory-cache
```

## CLI

```
$ clear-memory-cache --help

  Usage
    $ clear-memory-cache
		$ cmc

  Options
    $ cmc memory-clear
		$ cmc cache-clear
		$ cmc empty-standby-memory
		$ cmc clear-pm-cache --bun/npm/pnpm/yarn/all (runs: bun pm cache rm  -g, npm cache rm  -g --force, pnpm cache delete, yarn cache clean )
```
