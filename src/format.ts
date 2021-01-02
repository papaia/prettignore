import { EndOfLine, guessEOL } from './utils';

export interface FormatOptions {
  endOfLine?: EndOfLine;
}

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
  const eolType = options.endOfLine === 'auto' ? guessEOL(content) : options.endOfLine;
  const eol = EndOfLine[eolType];
  const manyEol = new RegExp(`(?<=${eol})(?:${eol}){2,}`, 'g');
  return content.trim().split(eol).map(formatLine).join(eol).replace(manyEol, eol) + eol;
}
