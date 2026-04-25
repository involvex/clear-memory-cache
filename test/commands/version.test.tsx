import {test, expect} from 'bun:test';
import {render} from 'ink-testing-library';
import Version from '../../src/commands/version.tsx';

test('Version renders package version', () => {
	const {lastFrame} = render(<Version />);
	// The component renders just the version number, e.g. "0.0.1"
	expect(lastFrame()).toMatch(/^\d+\.\d+\.\d+$/);
});
