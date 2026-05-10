# nitpick/no-redundant-vars

📝 Warns against variables that are returned without any other usage.

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```js
function calculate() {
  // logic...
  const result = x + y * z;
  return result;
}
```

✅ **Corrrect** code:

```js
function calculate() {
  // logic...
  return x + y * z;
}
```
