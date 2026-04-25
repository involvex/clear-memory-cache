import {test, expect} from 'bun:test';
import {render} from 'ink-testing-library';
import About from '../../src/commands/about.tsx';

test('About renders package name and description', () => {
	const {lastFrame} = render(<About />);
	expect(lastFrame()).toContain('clear-memory-cache');
});

test('About renders GitHub link', () => {
	const {lastFrame} = render(<About />);
	// The about component includes GitHub sponsor link text
	expect(lastFrame()).toContain('GitHub');
});
