/**
 * Runtime package.json reader.
 * Avoids static `import pkg from '../../package.json'` which causes TypeScript
 * to copy package.json into dist/ via resolveJsonModule.
 */
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

type Pkg = {
	name: string;
	version: string;
	description: string;
	author: string;
	funding: string;
};

const dir = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
	readFileSync(join(dir, '../package.json'), 'utf8'),
) as Pkg;

export default pkg;
