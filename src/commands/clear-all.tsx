import {Box, Text} from 'ink';
import {useEffect, useState} from 'react';
import {execCommand, type ExecResult} from '../utils/execute.js';

const STEPS = [
	{label: 'memory-clear        (rammap -Et)', cmd: 'rammap', args: ['-Et']},
	{label: 'empty-standby-memory (rammap -E0)', cmd: 'rammap', args: ['-E0']},
	{
		label: 'bun cache            (bun pm cache rm -g)',
		cmd: 'bun',
		args: ['pm', 'cache', 'rm', '-g'],
	},
	{
		label: 'npm cache            (npm cache rm -g --force)',
		cmd: 'npm',
		args: ['cache', 'rm', '-g', '--force'],
	},
	{
		label: 'pnpm cache           (pnpm cache delete)',
		cmd: 'pnpm',
		args: ['cache', 'delete'],
	},
	{
		label: 'yarn cache           (yarn cache clean)',
		cmd: 'yarn',
		args: ['cache', 'clean'],
	},
];

export default function ClearAll() {
	const [results, setResults] = useState<ExecResult[]>([]);
	const [done, setDone] = useState(false);

	useEffect(() => {
		const output: ExecResult[] = [];
		for (const step of STEPS) {
			output.push(execCommand(step.label, step.cmd, step.args));
		}

		setResults(output);
		setDone(true);
	}, []);

	return (
		<Box flexDirection="column" paddingY={1}>
			{!done && <Text color="yellow">⏳ Running full clear sequence…</Text>}
			{done &&
				results.map(r => (
					<Box key={r.label} flexDirection="column">
						{r.success ? (
							<Text color="green">✅ {r.label}</Text>
						) : (
							<>
								<Text color="red">❌ {r.label}</Text>
								{r.output.length > 0 && (
									<Text color="red" dimColor>
										{'   '}
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
