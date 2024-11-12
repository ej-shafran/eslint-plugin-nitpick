# Warns against using a rest element without destructuring other properties/elements (`nitpick/no-useless-rest`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```js
const { ...rest } = object;

const [...rest] = array;
```

✅ **Corrrect** code:

```js
const rest = object;
const { someKey, ...rest } = object;

const rest = array;
const [someElement, ...rest] = array;
```

## Rule Options

<!-- begin auto-generated rule options list -->

| Name     | Type    | Default |
| :------- | :------ | :------ |
| `array`  | Boolean | `true`  |
| `object` | Boolean | `true`  |

<!-- end auto-generated rule options list -->

### `array`

Whether this rule should be applied for array rest elements.

### `object`

Whether this rule should be applied for object rest elements.
