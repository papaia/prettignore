import outdent from 'outdent';

export const helpMenu = outdent`
  Usage: prettignore [options] [file/dir/glob...]

  Format options:
    --endOfLine <lf|crlf|cr|auto>
                          Which end of line character(s) to apply.
                          Default is lf.

  Other options:
    -h, --help            Print CLI Usage
    -v, --version         Print Prettiegnore version.
`;
