# Ensure the type of any injected `forwardRef`s matches the actual forwarded reference (`nestjs-pedantic/no-mismatched-forward-refs`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`, ⚡ `recommendedSwc`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```ts
class Service {
  constructor(
    @Inject(forwardRef(() => OtherService))
    other: ThirdService,
    @Inject(forwardRef(() => OtherService))
    other2: Circular<ThirdService>,
  ) {}
}
```

✅ **Corrrect** code:

```ts
class Service {
  constructor(
    @Inject(forwardRef(() => OtherService))
    other: OtherService,
    @Inject(forwardRef(() => ThirdService))
    other2: Circular<ThirdService>,
  ) {}
}
```
