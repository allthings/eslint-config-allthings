# eslint-config-allthings

ESlint shareable config for Allthings style

## Setup

```shell
yarn add -DE @allthings/eslint-config
```

## Usage

Add this to your .eslintrc.js

### React projects

```js
module.exports = {
  extends: ['@allthings/eslint-config'],
}
```

### Node.js projects

```js
module.exports = {
  extends: ['@allthings/eslint-config/node'],
}
```

## Deployment

Publishing to npm

```shell
yarn deploy
```

## Development

Run `yarn link` in the project folder

Run `yarn link @allthings/eslint-config` in the project that you want to test it against

After you finish run in your project `yarn unlink @allthings/eslint-config` and then `yarn install --force`
to restore the initial state of dependencies
