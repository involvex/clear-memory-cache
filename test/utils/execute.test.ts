import {test, expect} from 'bun:test';
import {execCommand} from '../../src/utils/execute.ts';
import {execPath} from 'node:process';

test('execCommand returns success on exit code 0', () => {
	// Use node --version which should always succeed
	const result = execCommand('node version', execPath, ['--version']);
	expect(result.success).toBe(true);
	expect(result.label).toBe('node version');
	expect(result.output.trim().length).toBeGreaterThan(0);
});

test('execCommand handles non-existent command', () => {
	const result = execCommand('nonexistent', 'nonexistent-cmd-12345', []);
	expect(result.success).toBe(false);
	expect(result.label).toBe('nonexistent');
	expect(result.output.length).toBeGreaterThan(0);
});
