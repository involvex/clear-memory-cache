import pkg from '../../package.json';
import {Text} from 'ink';

export default function Version() {
	return <Text>{pkg.version}</Text>;
}
