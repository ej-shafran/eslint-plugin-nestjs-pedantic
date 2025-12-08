# Disallow unused route parameters (`nestjs-pedantic/no-unused-route-params`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`, ⚡ `recommendedSwc`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```ts
@Controller("user")
class UserController {
  @Get(":id")
  getById() {}

  @Put("details/:id")
  putDetailsById() {}

  @Post("other/:userId")
  postOtherByUserId() {}
}
```

✅ **Corrrect** code:

```ts
@Controller("user")
class UserController {
  @Get(":id")
  getById(@Param("id") id: string) {}

  @Put("details")
  putDetails() {}

  @Post("other/:userId")
  postOtherByUserId(@Param() params: Record<string, string>) {}
}
```
