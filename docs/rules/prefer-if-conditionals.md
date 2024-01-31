# Prefer an `if` statement to using logical operators (`?:`, `&&` or `||`) in expressions (`nitpick/prefer-if-conditionals`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```js
isOk && doSomething();
(!isBad && isGood) || logError();
myObj && myObj.promise && (await myObj.promise);
```

✅ **Corrrect** code:

```js
if (isOk) doSomething();
if (!(!isBad && isGood)) logError();
if (myObj && myObj.promise) await myObj.promise;
```
