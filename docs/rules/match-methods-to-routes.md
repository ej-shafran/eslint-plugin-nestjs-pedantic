# Match method names to the decorated API routes (`nestjs-pedantic/match-methods-to-routes`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```ts
@Controller("user")
class UserController {
  @Get("route")
  someRandomName() {}

  @Post("other-route/:userId")
  someOtherRandomName() {}
}
```

✅ **Corrrect** code:

```ts
@Controller("user")
class UserController {
  @Get("route")
  getRoute() {}

  @Post("other-route/:userId")
  postOtherRouteByUserId() {}
}
```
