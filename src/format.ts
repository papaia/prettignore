import type { FormatOptions } from './types';

export function formatLine(line: string): string {
  line = line.trim();
  if (line[0] === '#') {
    if (line[1] === '#') return line;
    const content = /(?<=#\s*)(\S+)/.exec(line)?.[0];
    if (!content) return line;
    return `# ${content}`;
  }
  return line;
}

export function formatFile(content: string, options: Required<FormatOptions>): string {
  const EOL = options.eol === 'lf' ? '\n' : '\r\n';
  const manyEol = new RegExp(`(?<=${EOL})(?:${EOL}){2,}`, 'g');
  return content.trim().split(EOL).map(formatLine).join(EOL).replace(manyEol, EOL) + EOL;
}
