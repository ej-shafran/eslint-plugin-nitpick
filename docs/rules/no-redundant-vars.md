# Warns against variables that are returned without any other usage (`nitpick/no-redundant-vars`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

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
