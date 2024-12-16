# eslint-plugin-nitpick

Nitpicky ESLint rules.

## Installation

```
npm install -D eslint eslint-plugin-nitpick
```

## Configuration

To use the recommended configuration:

```js
import nitpick from "eslint-plugin-nitpick";

export default [
  // ...
  nitpick.configs.recommended,
];
```

To turn on every rule:

```js
import nitpick from "eslint-plugin-nitpick";

export default [
  // ...
  nitpick.configs.all,
];
```

See more: [Configuring Plugins](https://eslint.org/docs/latest/use/configure/plugins).

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
🌐 Set in the `all` configuration.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                                               | Description                                                                                        | 💼    | 🔧  | 💡  |
| :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :---- | :-- | :-- |
| [no-redundant-vars](docs/rules/no-redundant-vars.md)               | Warns against variables that are returned without any other usage                                  | 🌐 ✅ |     | 💡  |
| [no-useless-interpolation](docs/rules/no-useless-interpolation.md) | Warns against template-literal interpolation with a literal                                        | 🌐 ✅ | 🔧  | 💡  |
| [no-useless-rest](docs/rules/no-useless-rest.md)                   | Warns against using a rest element without destructuring other properties/elements                 | 🌐 ✅ |     | 💡  |
| [prefer-if-conditionals](docs/rules/prefer-if-conditionals.md)     | Prefer an `if` statement to using logical operators (`?:`, `&&` or `\|\|`) in expressions          | 🌐 ✅ | 🔧  | 💡  |
| [prefer-not-equals](docs/rules/prefer-not-equals.md)               | Prefer using the not-equals operator (`a !== b`) over inverting the equals operator (`!(a === b)`) | 🌐 ✅ |     | 💡  |

<!-- end auto-generated rules list -->

## Configs

<!-- begin auto-generated configs list -->

|     | Name          |
| :-- | :------------ |
| 🌐  | `all`         |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->
