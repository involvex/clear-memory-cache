import {test, expect} from 'bun:test';
import {render} from 'ink-testing-library';
import Help from '../../src/commands/help.tsx';

test('Help renders usage instructions', () => {
	const {lastFrame} = render(<Help />);
	expect(lastFrame()).toContain('Usage');
	expect(lastFrame()).toContain('Commands');
});

test('Help shows all commands', () => {
	const {lastFrame} = render(<Help />);
	const output = lastFrame();
	expect(output).toContain('memory-clear');
	expect(output).toContain('cache-clear');
	expect(output).toContain('empty-standby-memory');
	expect(output).toContain('clear-pm-cache');
	expect(output).toContain('clear-all');
	expect(output).toContain('clear-gradle-cache');
	expect(output).toContain('smart-clear');
});
