// lint-staged.config.js
const micromatch = require('micromatch');

module.exports = (allStagedFiles) => {
  const toRun = [];
  const tsFiles = micromatch(allStagedFiles, ['**/src/*.ts']);
  const forPrettier = micromatch(allStagedFiles, ['**/*.{md,ts,json,js}'], { ignore: 'dist' });
  if (tsFiles.length) {
    toRun.push('npm run build');
    toRun.push('npm test');
  }
  if (forPrettier.length) toRun.push(`prettier --write ${forPrettier.join(' ')}`);
  return toRun;
};
