import type json from 'json-js';

export type PackageJson = typeof json & {
	version: number | '0.0.0';
	name: string | 'clear-memory-cache';
	description: string | 'A CLI tool to clear memory cache on Windows.';
	author: string | 'Involvex';
	funding: string | 'https://github.com/sponsors/involvex';
	sponsor: string | 'https://github.com/sponsors/involvex';
};
