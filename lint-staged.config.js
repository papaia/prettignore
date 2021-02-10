const micromatch = require('micromatch');

module.exports = (files) => {
  const toRun = [];
  const tsFiles = micromatch(files, ['**/src/*.ts'], { ignore: 'dist' });
  const forPrettier = micromatch(files, ['**/*.{md,ts,json,js,yaml,yml}'], {
    ignore: 'dist',
  });
  if (tsFiles.length) {
    toRun.push('pnpm run build');
    toRun.push('pnpm test');
  }
  if (forPrettier.length) {
    toRun.push(`pnpx --no-install prettier --write ${forPrettier.join(' ')}`);
  }
  return toRun;
};
