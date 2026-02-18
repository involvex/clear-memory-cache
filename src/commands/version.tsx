import {Text} from 'ink';
import pkg from '../../package.json';

const {version} = pkg;

export default function Version() {
	return <Text>{version}</Text>;
}
