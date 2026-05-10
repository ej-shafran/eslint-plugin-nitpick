# nitpick/no-useless-interpolation

📝 Warns against template-literal interpolation with a literal.

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```js
`${"literal"}`;
`${10}`;
`${true}`;
`${null}`;

`${"hello"} world`;
```

✅ **Corrrect** code:

```js
`literal`;
`10`;
`true`;
`null`;

`hello world`;
```
