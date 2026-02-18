import {existsSync, rmSync} from 'node:fs';
import {homedir} from 'node:os';
import {join} from 'node:path';
import {Box, Text} from 'ink';
import {useEffect, useState} from 'react';

type Result = {
	success: boolean;
	path: string;
	message: string;
};

function resolveGradleCachePath(): string {
	const gradleHome = process.env['GRADLE_HOME'];
	if (gradleHome) {
		return join(gradleHome, 'caches');
	}

	return join(homedir(), '.gradle', 'caches');
}

export default function ClearGradleCache() {
	const [result, setResult] = useState<Result | null>(null);

	useEffect(() => {
		const cachePath = resolveGradleCachePath();

		if (!existsSync(cachePath)) {
			setResult({
				success: false,
				path: cachePath,
				message: 'Directory not found — nothing to delete.',
			});
			return;
		}

		try {
			rmSync(cachePath, {recursive: true, force: true});
			setResult({
				success: true,
				path: cachePath,
				message: 'Gradle cache deleted.',
			});
		} catch (err) {
			setResult({
				success: false,
				path: cachePath,
				message:
					err instanceof Error ? err.message : 'Unknown error during deletion.',
			});
		}
	}, []);

	return (
		<Box flexDirection="column" paddingY={1}>
			{result === null && <Text color="yellow">⏳ Clearing Gradle cache…</Text>}
			{result !== null && result.success && (
				<Box flexDirection="column">
					<Text color="green">✅ gradle cache cleared.</Text>
					<Text dimColor>
						{'   '}
						{result.path}
					</Text>
				</Box>
			)}
			{result !== null && !result.success && (
				<Box flexDirection="column">
					<Text color="red">❌ gradle cache — {result.message}</Text>
					<Text dimColor>
						{'   '}
						{result.path}
					</Text>
				</Box>
			)}
		</Box>
	);
}
