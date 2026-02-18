import pkg from '../../package.json';
import {Box, Text} from 'ink';
import Link from 'ink-link';

export default function About() {
	const {name, version, description} = pkg;

	return (
		<Box flexDirection="column" padding={1}>
			<Text bold>{name}</Text>
			<Text>{description}</Text>
			<Text>{version}</Text>
			<Text bold>Author:</Text> <Text>{pkg.author}</Text>
			<A href="https://github.com/involvex/clear-memory-cache">
				<Text>GitHub</Text>
			</A>
		</Box>
	);
}

function A({href, children}: {href: string; children: React.ReactNode}) {
	return (
		<Text>
			<Link url={href}>{children}</Link>
		</Text>
	);
}
