import pkg from '../../package.json';
import {Box, Text} from 'ink';
import Link from 'ink-link';
// import package from '../../package.json';

export default function About() {
	const {name, version, description, author, funding} = pkg;

	return (
		<Box flexDirection="column" padding={1}>
			<Text bold>{name}</Text>
			<Text>{description}</Text>
			<Text>{version}</Text>
			<Text bold>Author:</Text> <Text>{author}</Text>
			<A href={funding}>
				<Text>GitHub</Text>
			</A>
		</Box>
	);
}

function A({href, children}: {href: string; children: React.ReactNode}) {
	return (
		<Text>
			<Link url={href}>
				<Text>{children}</Text>
			</Link>
		</Text>
	);
}
