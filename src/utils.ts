import type { PrettignoreConfig } from './cli';

const makeEnum = (keys: Object): any =>
  Object.entries(keys).reduce((o, [k, v]) => ({ ...o, [k]: v, [v]: k }), {} as any);

export type EndOfLine = 'lf' | 'crlf' | 'cr' | 'auto';
export const EndOfLine: Record<EndOfLine, EndOfLine> = makeEnum({
  auto: 'auto',
  cr: '\r',
  lf: '\n',
  crlf: '\r\n',
});

export const guessEOL = (text: string): EndOfLine => {
  const index = text.indexOf('\r');
  if (index >= 0) {
    return text[index + 1] === '\n' ? 'crlf' : 'cr';
  }
  return 'lf';
};

export const grey = (str: string): string => `\u001b[90m${str}\u001b[0m`;

export function tryRequire<T>(path: string): (T extends object ? Partial<T> : T) | null {
  try {
    return require(path);
  } catch {
    return null;
  }
}

const makeParamError = (param: string) =>
  `Invalid or missing \`${param}\` option given to prettignore.`;
export const validateConfig = (config: PrettignoreConfig) => {
  const errors = [];
  if (!Array.isArray(config.files)) errors.push(makeParamError('files'));
  if (config.endOfLine && !EndOfLine[config.endOfLine])
    errors.push(makeParamError('endOfLine'));
  if (errors.length) {
    errors.forEach((e) => console.error(e));
    process.exit(1);
  }
};
