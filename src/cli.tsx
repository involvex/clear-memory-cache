#!/usr/bin/env node
import {render} from 'ink';
import meow from 'meow';
import About from './commands/about.js';
import CacheClear from './commands/cache-clear.js';
import ClearAll from './commands/clear-all.js';
import ClearPmCache from './commands/clear-pm-cache.js';
import EmptyStandbyMemory from './commands/empty-standby-memory.js';
import Help from './commands/help.js';
import MemoryClear from './commands/memory-clear.js';
import SmartClear from './commands/smart-clear.js';
import Version from './commands/version.js';

const cli = meow(
	`
  Usage
    $ clear-memory-cache <command> [options]
    $ cmc <command> [options]

  Commands
    memory-clear           Empty all process working sets (rammap -Et)
    cache-clear            Empty system working set / caches (rammap -Es)
    empty-standby-memory   Empty standby list (rammap -E0)
    clear-pm-cache         Clear package manager caches
    clear-all              Run memory-clear + empty-standby-memory + clear-pm-cache --all
    smart-clear            Analyze memory and clear only what is necessary
    help                   Show this help message
    about                  Show package information
    version                Show version number

  Options for clear-pm-cache
    --bun    Clear bun global cache   (bun pm cache rm -g)
    --npm    Clear npm cache          (npm cache rm -g --force)
    --pnpm   Clear pnpm store cache   (pnpm cache delete)
    --yarn   Clear yarn cache         (yarn cache clean)
    --all    Clear all of the above

  Examples
    $ cmc memory-clear
    $ cmc cache-clear
    $ cmc empty-standby-memory
    $ cmc clear-pm-cache --npm
    $ cmc clear-all
    $ cmc smart-clear
    $ clear-memory-cache clear-pm-cache --all
`,
	{
		importMeta: import.meta,
		flags: {
			bun: {type: 'boolean', default: false},
			npm: {type: 'boolean', default: false},
			pnpm: {type: 'boolean', default: false},
			yarn: {type: 'boolean', default: false},
			all: {type: 'boolean', default: false},
		},
	},
);

const command = cli.input[0];

switch (command) {
	case 'memory-clear': {
		render(<MemoryClear />);
		break;
	}

	case 'cache-clear': {
		render(<CacheClear />);
		break;
	}

	case 'empty-standby-memory': {
		render(<EmptyStandbyMemory />);
		break;
	}

	case 'clear-pm-cache': {
		render(
			<ClearPmCache
				flags={{
					bun: cli.flags.bun,
					npm: cli.flags.npm,
					pnpm: cli.flags.pnpm,
					yarn: cli.flags.yarn,
					all: cli.flags.all,
				}}
			/>,
		);
		break;
	}

	case 'clear-all': {
		render(<ClearAll />);
		break;
	}

	case 'smart-clear': {
		render(<SmartClear />);
		break;
	}

	case 'about': {
		render(<About />);
		break;
	}

	case 'version': {
		render(<Version />);
		break;
	}

	default: {
		render(<Help />);
		break;
	}
}
