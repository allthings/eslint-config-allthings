/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires
 */
const config = require('./index')
config.parserOptions = {
  ecmaVersion: 2021,
  sourceType: 'module',
}
module.exports = config
