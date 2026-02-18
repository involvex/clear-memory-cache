import {Box, Text} from 'ink';
import {useEffect, useState} from 'react';
import {spawnSync} from 'node:child_process';

type PmFlags = {
	bun: boolean;
	npm: boolean;
	pnpm: boolean;
	yarn: boolean;
	all: boolean;
};

type PmResult = {
	pm: string;
	success: boolean;
	output: string;
};

const PM_COMMANDS: Array<{
	key: keyof Omit<PmFlags, 'all'>;
	label: string;
	cmd: string;
	args: string[];
}> = [
	{key: 'bun', label: 'bun', cmd: 'bun', args: ['pm', 'cache', 'rm', '-g']},
	{key: 'npm', label: 'npm', cmd: 'npm', args: ['cache', 'clean', '--force']},
	{key: 'pnpm', label: 'pnpm', cmd: 'pnpm', args: ['store', 'prune']},
	{key: 'yarn', label: 'yarn', cmd: 'yarn', args: ['cache', 'clean']},
];

export default function ClearPmCache({flags}: {flags: PmFlags}) {
	const [results, setResults] = useState<PmResult[]>([]);
	const [done, setDone] = useState(false);

	useEffect(() => {
		const selected = flags.all
			? PM_COMMANDS
			: PM_COMMANDS.filter(pm => flags[pm.key]);

		if (selected.length === 0) {
			setDone(true);
			return;
		}

		const output: PmResult[] = [];

		for (const pm of selected) {
			const result = spawnSync(pm.cmd, pm.args, {
				shell: true,
				encoding: 'utf8',
				windowsHide: true,
			});

			const success = !result.error && result.status === 0;
			const msg = success
				? (result.stdout?.trim() ?? '')
				: (result.error?.message ??
					result.stderr?.trim() ??
					`Exit code: ${String(result.status)}`);

			output.push({pm: pm.label, success, output: msg});
		}

		setResults(output);
		setDone(true);
	}, [flags]);

	const hasFlags =
		flags.all || flags.bun || flags.npm || flags.pnpm || flags.yarn;

	if (!hasFlags) {
		return (
			<Box flexDirection="column" paddingY={1}>
				<Text color="yellow">⚠️ No package manager specified.</Text>
				<Text>
					Usage: <Text bold>cmc clear-pm-cache</Text>{' '}
					<Text color="cyan">--bun | --npm | --pnpm | --yarn | --all</Text>
				</Text>
			</Box>
		);
	}

	return (
		<Box flexDirection="column" paddingY={1}>
			{!done && <Text color="yellow">⏳ Clearing package manager caches…</Text>}
			{done &&
				results.map(r => (
					<Box key={r.pm} flexDirection="column" marginBottom={0}>
						{r.success ? (
							<Text color="green">
								✅ <Text bold>{r.pm}</Text> cache cleared.
								{r.output.length > 0 && <Text dimColor> {r.output}</Text>}
							</Text>
						) : (
							<>
								<Text color="red">
									❌ <Text bold>{r.pm}</Text> cache clear failed.
								</Text>
								{r.output.length > 0 && (
									<Text color="red" dimColor>
										{r.output}
									</Text>
								)}
							</>
						)}
					</Box>
				))}
		</Box>
	);
}
