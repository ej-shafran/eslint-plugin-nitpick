# nitpick/no-useless-rest

📝 Warns against using a rest element without destructuring other properties/elements.

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

| Name     | Description                                 | Type    | Default |
| :------- | :------------------------------------------ | :------ | :------ |
| `array`  | Validate this rule for array rest elements  | Boolean | `true`  |
| `object` | Validate this rule for object rest elements | Boolean | `true`  |

<!-- end auto-generated rule options list -->

### `array`

Whether this rule should be applied for array rest elements.

### `object`

Whether this rule should be applied for object rest elements.
