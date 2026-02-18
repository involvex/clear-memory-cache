import {spawnSync} from 'node:child_process';

export type ExecResult = {
	label: string;
	success: boolean;
	output: string;
};

export function execCommand(
	label: string,
	cmd: string,
	args: string[],
): ExecResult {
	const result = spawnSync(cmd, args, {
		shell: true,
		encoding: 'utf8',
		windowsHide: true,
	});

	const success = !result.error && result.status === 0;
	const output = success
		? (result.stdout?.trim() ?? '')
		: (result.error?.message ??
			result.stderr?.trim() ??
			`Exit code: ${String(result.status)}`);

	return {label, success, output};
}
