import {Box, Text} from 'ink';

export default function Help() {
	return (
		<Box flexDirection="column" padding={1}>
			<Text bold color="cyan">
				clear-memory-cache
			</Text>
			<Text dimColor>
				A CLI tool to clear Windows caches and standby memory via Rammap.
			</Text>
			<Text> </Text>

			<Text bold>Usage</Text>
			<Text>
				{'  '}
				<Text color="green">$ clear-memory-cache</Text>{' '}
				<Text color="yellow">{'<command>'}</Text>{' '}
				<Text color="cyan">[options]</Text>
			</Text>
			<Text>
				{'  '}
				<Text color="green">$ cmc</Text>{' '}
				<Text color="yellow">{'<command>'}</Text>{' '}
				<Text color="cyan">[options]</Text>
			</Text>
			<Text> </Text>

			<Text bold>Commands</Text>
			<Text>
				{'  '}
				<Text color="yellow" bold>
					memory-clear
				</Text>
				{'          '}
				Empty all process working sets <Text dimColor>(rammap -Et)</Text>
			</Text>
			<Text>
				{'  '}
				<Text color="yellow" bold>
					cache-clear
				</Text>
				{'           '}
				Empty system working set / caches <Text dimColor>(rammap -Es)</Text>
			</Text>
			<Text>
				{'  '}
				<Text color="yellow" bold>
					empty-standby-memory
				</Text>
				{'  '}Empty standby list <Text dimColor>(rammap -E0)</Text>
			</Text>
			<Text>
				{'  '}
				<Text color="yellow" bold>
					clear-pm-cache
				</Text>
				{'        '}Clear package manager caches
			</Text>
			<Text>
				{'  '}
				<Text color="yellow" bold>
					version
				</Text>
				{'               '}Show version
			</Text>
			<Text>
				{'  '}
				<Text color="yellow" bold>
					about
				</Text>
				{'                 '}Show package info
			</Text>
			<Text>
				{'  '}
				<Text color="yellow" bold>
					help
				</Text>
				{'                  '}Show this help message
			</Text>
			<Text> </Text>

			<Text bold>Options for clear-pm-cache</Text>
			<Text>
				{'  '}
				<Text color="cyan">--bun</Text>
				{'   '}bun pm cache rm -g
			</Text>
			<Text>
				{'  '}
				<Text color="cyan">--npm</Text>
				{'   '}npm cache clean --force
			</Text>
			<Text>
				{'  '}
				<Text color="cyan">--pnpm</Text>
				{'  '}pnpm store prune
			</Text>
			<Text>
				{'  '}
				<Text color="cyan">--yarn</Text>
				{'  '}yarn cache clean
			</Text>
			<Text>
				{'  '}
				<Text color="cyan">--all</Text>
				{'   '}Run all of the above
			</Text>
			<Text> </Text>

			<Text bold>Examples</Text>
			<Text>
				{'  '}
				<Text color="green">$ cmc memory-clear</Text>
			</Text>
			<Text>
				{'  '}
				<Text color="green">$ cmc empty-standby-memory</Text>
			</Text>
			<Text>
				{'  '}
				<Text color="green">$ cmc clear-pm-cache --npm</Text>
			</Text>
			<Text>
				{'  '}
				<Text color="green">$ clear-memory-cache clear-pm-cache --all</Text>
			</Text>
			<Text> </Text>

			<Text dimColor>
				Prerequisite: rammap must be installed and available in PATH.
			</Text>
		</Box>
	);
}
