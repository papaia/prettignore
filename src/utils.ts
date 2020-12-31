import type { PrettignoreConfig } from './types';

export function tryRequire<T>(path: string): T | null {
  try {
    return require(path);
  } catch {
    return null;
  }
}

const logParamError = (option: string) =>
  console.error(`Invalid \`${option}\` option in .prettignorerc.json`);
export function validateConfig(config: PrettignoreConfig): void {
  const errors = [];
  if (!Array.isArray(config.include)) errors.push('include');
  if (config.exclude && !Array.isArray(config.exclude)) errors.push('exclude');
  if (config.eol && config.eol !== 'crlf' && config.eol !== 'lf') errors.push('eol');
  if (errors.length) {
    errors.forEach(logParamError);
    process.exit(1);
  }
}

export const grey = (str: string): string => `\u001b[90m${str}\u001b[0m`;
