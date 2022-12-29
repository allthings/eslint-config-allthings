# eslint-config-allthings


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

### Node.js projects (TODO)

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
