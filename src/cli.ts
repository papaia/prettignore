#!/usr/bin/env node

import { FormatOptions, formatFile, version } from '.';
import globby from 'globby';
import { helpMenu } from './constants';
import { grey, tryRequire, validateConfig } from './utils';
import { join } from 'path';
import minimist from 'minimist';
import { readFile, writeFile } from 'fs/promises';
import timeSpan from 'time-span';

export interface PrettignoreConfig extends FormatOptions {
  files: string[];
}

async function main() {
  const { _: files, ...cliOptions } = minimist(process.argv.slice(2), {
    string: ['endOfLine'],
    boolean: ['help', 'version'],
    alias: { help: 'h', version: 'v' },
    unknown: () => false,
  });

  if (cliOptions.version) {
    console.log(version);
    process.exit(0);
  }

  const fileOptions = tryRequire<PrettignoreConfig>(join(process.cwd(), '.prettignorerc.json'))!;
  if (cliOptions.help || (!fileOptions && !files.length)) {
    console.log(helpMenu);
    process.exit(0);
  }

  const config: Required<PrettignoreConfig> = {
    files,
    endOfLine: 'lf',
    ...fileOptions,
    ...cliOptions,
  };

  validateConfig(config);

  if (!config.files?.length) {
    console.log(helpMenu);
    process.exit(0);
  }

  for await (const path of globby.stream(config.files, {
    dot: true,
    onlyFiles: true,
    ignore: ['node_modules/**'],
  })) {
    const stringPath = path.toString(); // good ol' typescript
    const filepath = join(process.cwd(), stringPath);
    const end = timeSpan();

    const oldContent = await readFile(filepath, { encoding: 'utf8' });
    const newContent = formatFile(oldContent, config);
    await writeFile(path, newContent);

    console.log(`${oldContent === newContent ? grey(stringPath) : stringPath} ${end.rounded()}ms`);
  }
}

main();
