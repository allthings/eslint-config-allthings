/* eslint-disable
  unicorn/prefer-module,
  @typescript-eslint/no-var-requires,
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-require-imports,
  @typescript-eslint/no-unsafe-call
 */
const config = require('../index')
config.parserOptions = {
  ecmaVersion: 2021,
  projectService: {
    allowDefaultProject: ['*.js', '.eslintrc.js'],
  },
  sourceType: 'module',
  tsconfigRootDir: __dirname,
}
module.exports = config
