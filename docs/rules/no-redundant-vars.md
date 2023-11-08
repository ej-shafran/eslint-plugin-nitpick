# Warns against variables that are returned without any other usage (`nitpick/no-redundant-vars`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

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

## Rule Options

```js
...
"nitpick/no-redundant-vars": []
...
```

This rule takes no options.
