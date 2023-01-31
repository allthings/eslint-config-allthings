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

## Development

Publishing to npm

```shell
yarn deploy
```
