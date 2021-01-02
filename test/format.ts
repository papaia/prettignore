import test from 'ava';

import * as prettignore from '../src';

const options: Required<prettignore.FormatOptions> = { endOfLine: 'crlf' };
const EOL = '\r\n';

type Test = Record<string, [string, string][]>;

test('format functions exist', (t) => {
  t.is(typeof prettignore.formatFile, 'function');
  t.is(typeof prettignore.formatLine, 'function');
});

const lineTests: Test = {
  comments: [
    ['#hello', '# hello'],
    ['#         hello', '# hello'],
    ['##hello', '##hello'],
  ],
  'remove leading and trailing spaces': [
    ['            build', 'build'],
    ['build            ', 'build'],
    ['            build            ', 'build'],
  ],
};

for (const [name, specs] of Object.entries(lineTests)) {
  test(`single line: ${name}`, (t) => {
    for (const [before, expected] of specs) {
      t.is(prettignore.formatLine(before), expected);
    }
  });
}

const fileTests: Test = {
  'additional EOL at EOF': [
    [`dist${EOL}build${EOL}${EOL}ignored${EOL}`, `dist${EOL}build${EOL}${EOL}ignored${EOL}`],
    [`dist${EOL}${EOL}${EOL}${EOL}${EOL}`, `dist${EOL}`],
  ],
  'removes leading and extra trailing EOL': [
    [`${EOL}${EOL}${EOL}build${EOL}dist${EOL}${EOL}${EOL}`, `build${EOL}dist${EOL}`],
  ],
  'removes line gaps larger than 2': [
    // note that two EOL is just a blank line
    [
      `build${EOL}${EOL}${EOL}dist${EOL}built${EOL}${EOL}${EOL}ignore${EOL}`,
      `build${EOL}${EOL}dist${EOL}built${EOL}${EOL}ignore${EOL}`,
    ],
  ],
};

for (const [name, specs] of Object.entries(fileTests)) {
  test(`whole file: ${name}`, (t) => {
    for (const [before, expected] of specs) {
      t.is(prettignore.formatFile(before, options), expected);
    }
  });
}
