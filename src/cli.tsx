#!/usr/bin/env node
// import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';
import Help from './commands/help.js';
import About from './commands/about.js';

const cli = meow(
	`
	Usage
	  $ clear-memory-cache
		$ cmc

  Options
    $ cmc memory-clear
		$ cmc cache-clear
		$ cmc empty-standby-memory
		$ cmc clear-pm-cache --bun/npm/pnpm/yarn/all
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);

if (cli.input[0] === 'help') {
	render(<Help />);
} else if (cli.input[0] === 'about') {
	render(<About />);
} else {
	render(<App name={cli.flags.name} />);
}
