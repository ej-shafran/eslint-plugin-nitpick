# nitpick/prefer-not-equals

📝 Prefer using the not-equals operator (`a !== b`) over inverting the equals operator (`!(a === b)`).

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```js
!(a === b);
!(a == b);

!(a === b || c);
!(d > e || a === b || c);
```

✅ **Corrrect** code:

```js
a !== b;
a != b;

a !== b || !c;
!(d > e) || a !== b || !c;
```
