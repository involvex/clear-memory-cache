import {Text} from 'ink';
import pkg from '../pkg.js';

export default function Version() {
	return <Text>{pkg.version}</Text>;
}
