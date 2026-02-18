import {Box, Text} from 'ink';
import Link from 'ink-link';
import pkg from '../pkg.js';

export default function About() {
	const {name, version, description, author, funding} = pkg;

	return (
		<Box flexDirection="column" padding={1}>
			<Text bold>{name}</Text>
			<Text>{description}</Text>
			<Text>{version}</Text>
			<Text>
				<Text bold>Author: </Text>
				{author}
			</Text>
			<Text>
				<Link url={funding}>GitHub Sponsors</Link>
			</Text>
		</Box>
	);
}
