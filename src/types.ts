export interface FormatOptions {
  eol?: 'lf' | 'crlf';
}

export interface PrettignoreConfig extends FormatOptions {
  include: string[];
  exclude?: string[];
}
