# Keep a convention when decorating routes (`nestjs-pedantic/route-convention`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```ts
@Controller("user")
class UserController {
  @Get("/trailing")
  getTrailing() {}

  @Post("other-side/")
  postOtherSide() {}

  @Patch("/both-sides/")
  patchBothSides() {}
}
```

✅ **Corrrect** code:

```ts
@Controller("user")
class UserController {
  @Get("trailing")
  getTrailing() {}

  @Post("other-side")
  postOtherSide() {}

  @Patch("both-sides")
  patchBothSides() {}
}
```
