import {Box, Text} from 'ink';
import {useEffect, useState} from 'react';
import {spawnSync} from 'node:child_process';

type Status = 'running' | 'success' | 'error';

export default function MemoryClear() {
	const [status, setStatus] = useState<Status>('running');
	const [output, setOutput] = useState('');

	useEffect(() => {
		const result = spawnSync('rammap', ['-Et'], {
			shell: true,
			encoding: 'utf8',
			windowsHide: true,
		});

		if (result.error ?? result.status !== 0) {
			const errMsg =
				result.error?.message ??
				result.stderr?.trim() ??
				`Exit code: ${String(result.status)}`;
			setOutput(errMsg);
			setStatus('error');
		} else {
			setOutput(result.stdout?.trim() ?? '');
			setStatus('success');
		}
	}, []);

	return (
		<Box flexDirection="column" paddingY={1}>
			{status === 'running' && (
				<Text color="yellow">⏳ Clearing memory (rammap -Et)…</Text>
			)}
			{status === 'success' && (
				<>
					<Text color="green">✅ Memory cleared successfully.</Text>
					{output.length > 0 && <Text dimColor>{output}</Text>}
				</>
			)}
			{status === 'error' && (
				<>
					<Text color="red">❌ Failed to clear memory.</Text>
					<Text color="red" dimColor>
						{output}
					</Text>
					<Text dimColor>Make sure rammap is installed and in PATH.</Text>
				</>
			)}
		</Box>
	);
}
