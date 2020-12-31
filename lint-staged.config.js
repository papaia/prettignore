// lint-staged.config.js
const micromatch = require('micromatch');

module.exports = (stagedFiles) => {
  const toRun = [];
  const tsFiles = micromatch(stagedFiles, ['**/src/*.ts'], { ignore: 'dist' });
  const forPrettier = micromatch(stagedFiles, ['**/*.{md,ts,json,js}'], { ignore: 'dist' });
  if (tsFiles.length) {
    toRun.push('npm run build');
    toRun.push('npm test');
  }
  if (forPrettier.length) toRun.push(`prettier --write ${forPrettier.join(' ')}`);
  return toRun;
};
