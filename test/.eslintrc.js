/* eslint-disable
  @typescript-eslint/no-var-requires,
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
