/**
 * Runtime package.json reader.
 * Works both in development (from src/) and production (from dist/src/).
 */
import {readFileSync, existsSync} from 'node:fs';
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
const candidate1 = join(dir, '../package.json');
const candidate2 = join(dir, '../../package.json');
const pkgPath = existsSync(candidate1) ? candidate1 : candidate2;

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as Pkg;

export default pkg;
