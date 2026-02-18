import {freemem, totalmem} from 'node:os';
import {Box, Text} from 'ink';
import {useEffect, useState} from 'react';
import {execCommand, type ExecResult} from '../utils/execute.js';

function formatMB(bytes: number): string {
	return `${Math.round(bytes / 1024 / 1024)} MB`;
}

type Level = 'healthy' | 'moderate' | 'low' | 'critical';

type SmartResult = {
	level: Level;
	freePercent: number;
	totalMB: string;
	freeMB: string;
	results: ExecResult[];
};

const LEVEL_COLOR: Record<Level, string> = {
	healthy: 'green',
	moderate: 'yellow',
	low: 'red',
	critical: 'redBright',
};

const LEVEL_ICON: Record<Level, string> = {
	healthy: '✅',
	moderate: '🟡',
	low: '⚠️ ',
	critical: '🚨',
};

export default function SmartClear() {
	const [result, setResult] = useState<SmartResult | null>(null);

	useEffect(() => {
		const total = totalmem();
		const free = freemem();
		const freePercent = (free / total) * 100;

		type Step = {label: string; cmd: string; args: string[]};
		let steps: Step[] = [];
		let level: Level;

		if (freePercent < 10) {
			level = 'critical';
			steps = [
				{label: 'memory-clear (rammap -Et)', cmd: 'rammap', args: ['-Et']},
				{
					label: 'empty-standby-memory (rammap -E0)',
					cmd: 'rammap',
					args: ['-E0'],
				},
				{label: 'cache-clear (rammap -Es)', cmd: 'rammap', args: ['-Es']},
			];
		} else if (freePercent < 20) {
			level = 'low';
			steps = [
				{
					label: 'empty-standby-memory (rammap -E0)',
					cmd: 'rammap',
					args: ['-E0'],
				},
				{label: 'cache-clear (rammap -Es)', cmd: 'rammap', args: ['-Es']},
			];
		} else if (freePercent < 40) {
			level = 'moderate';
			steps = [
				{label: 'cache-clear (rammap -Es)', cmd: 'rammap', args: ['-Es']},
			];
		} else {
			level = 'healthy';
		}

		const results = steps.map(s => execCommand(s.label, s.cmd, s.args));

		setResult({
			level,
			freePercent,
			totalMB: formatMB(total),
			freeMB: formatMB(free),
			results,
		});
	}, []);

	if (!result) {
		return (
			<Box paddingY={1}>
				<Text color="yellow">⏳ Analyzing memory…</Text>
			</Box>
		);
	}

	return (
		<Box flexDirection="column" paddingY={1}>
			<Text bold>Memory Analysis</Text>
			<Text>
				{'  '}Total RAM: <Text bold>{result.totalMB}</Text>
			</Text>
			<Text>
				{'  '}Free RAM:{'  '}
				<Text bold>{result.freeMB}</Text>{' '}
				<Text dimColor>({result.freePercent.toFixed(1)}%)</Text>
			</Text>
			<Text>
				{'  '}Status:{'   '}
				<Text color={LEVEL_COLOR[result.level]} bold>
					{LEVEL_ICON[result.level]} {result.level.toUpperCase()}
				</Text>
			</Text>
			<Text> </Text>
			{result.level === 'healthy' ? (
				<Text color="green">✅ Memory is healthy — no action needed.</Text>
			) : (
				<>
					<Text bold>Actions taken:</Text>
					{result.results.map(r => (
						<Box key={r.label} flexDirection="column">
							{r.success ? (
								<Text color="green">
									{'  '}✅ {r.label}
								</Text>
							) : (
								<>
									<Text color="red">
										{'  '}❌ {r.label}
									</Text>
									{r.output.length > 0 && (
										<Text color="red" dimColor>
											{'      '}
											{r.output}
										</Text>
									)}
								</>
							)}
						</Box>
					))}
				</>
			)}
		</Box>
	);
}
