#!/usr/bin/env node

import globby from 'globby';
import { grey } from './utils';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import timeSpan from 'time-span';

import { formatFile } from './format';
import type { PrettignoreConfig } from './types';
import { tryRequire, validateConfig } from './utils';

async function main() {
  const config = tryRequire<PrettignoreConfig>(join(process.cwd(), '.prettignorerc.json'));
  if (!config) {
    return console.error('Invalid or missing `.prettignorerc.json` file found. Exiting...');
  }

  validateConfig(config);

  for await (const path of globby.stream(config.include, {
    dot: true,
    ignore: config.exclude || [],
    onlyFiles: true,
  })) {
    const stringPath = path.toString(); // good ol' typescript
    const filepath = join(process.cwd(), stringPath);
    const end = timeSpan();

    const old = await readFile(filepath, { encoding: 'utf8' });
    const newContent = formatFile(old, { eol: config.eol || 'crlf' });
    await writeFile(path, newContent);

    console.log(`${old === newContent ? grey(stringPath) : stringPath} ${end.rounded()}ms`);
  }
}

main();
