# eslint-plugin-nitpick

Nitpicky ESLint rules.

## Installation

```
npm install -D eslint eslint-plugin-nitpick
```

## Configuration

### Old (`.eslintrc.*`)

```js
module.exports = {
  // ...
  plugins: [
    // ...
    "nitpick",
  ],
  extends: [
    // ...
    "nitpick/recommended",
  ],
};
```

## New (`eslint.config.js`)

Either use one of the configs in `eslint-plugin-nitpick/lib/configs` or import the plugin as a standalone from `eslint-plugin-nitpick`.

```js
const nitpickRecommended = require("eslint-plugin-nitpick/lib/configs/recommended");

module.exports = {
  // ...
  ...nitpickRecommended,
};
```

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
🌐 Set in the `all` configuration.\
✅ Set in the `recommended` configuration.\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                                 | Description                                                                        | 💼    | 💡  |
| :--------------------------------------------------- | :--------------------------------------------------------------------------------- | :---- | :-- |
| [no-redundant-vars](docs/rules/no-redundant-vars.md) | Warns against variables that are returned without any other usage                  | 🌐 ✅ | 💡  |
| [no-useless-rest](docs/rules/no-useless-rest.md)     | Warns against using a rest element without destructuring other properties/elements | 🌐 ✅ | 💡  |

<!-- end auto-generated rules list -->

## Configs

<!-- begin auto-generated configs list -->

|     | Name          |
| :-- | :------------ |
| 🌐  | `all`         |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->
