import test from 'ava';

import * as prettignore from '../src';

test('version exists', (t) => {
  t.is(typeof prettignore.version, 'string');
});

test('EndOfLine enum', (t) => {
  t.is(typeof prettignore.EndOfLine, 'object');
  t.deepEqual(prettignore.EndOfLine, {
    lf: '\n',
    '\n': 'lf',
    crlf: '\r\n',
    '\r\n': 'crlf',
    cr: '\r',
    '\r': 'cr',
    auto: 'auto',
  });
});
