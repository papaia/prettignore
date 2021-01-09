const { join } = require('path');
module.exports = {
  ...require('@papaia/prettier'),
  endOfLine: 'lf',
  pluginSearchDirs: [__dirname, join(__dirname, 'node_modules', '.pnpm')],
};
