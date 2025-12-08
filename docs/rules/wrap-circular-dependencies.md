# Wrap circular dependencies to prevent SWC compilation issues (`nestjs-pedantic/wrap-circular-dependencies`)

💼 This rule is enabled in the following configs: 🌐 `all`, ⚡ `recommendedSwc`.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```ts
@Injectable()
class Service {
  constructor(
    @Inject(forwardRef(() => OtherService))
    other: OtherService,
    @Inject(forwardRef(() => ThirdService))
    private readonly third: ThirdService,
  ) {}
}
```

✅ **Corrrect** code:

```ts
@Injectable()
class Service {
  constructor(
    @Inject(forwardRef(() => OtherService))
    other: Circular<OtherService>,
    @Inject(forwardRef(() => ThirdService))
    private readonly third: Circular<ThirdService>,
  ) {}
}
```

## Additional Setup

The auto-fix for this rule uses a `Circular` type helper, which is defined by this package globally. You can set it up in your `tsconfig.json`:

```jsonc
{
  // ...
  "compilerOptions": {
    // ...
    "types": [/* ... */ "eslint-plugin-nestjs-pedantic/circular"],
  },
}
```

Alternatively, you can define it by yourself in any `.d.ts` file which is included in your TypeScript project:

```ts
declare type Circular<T> = T;
```
