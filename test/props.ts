import test from 'ava';

import * as prettignore from '../src';

test('version exists', (t) => {
  t.is(typeof prettignore.version, 'string');
});

test('EndOfLine enum exists', (t) => {
  t.is(typeof prettignore.EndOfLine, 'object');
});
