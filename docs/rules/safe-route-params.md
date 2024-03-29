# Ensure safe usage of the `@Param` decorator (`nestjs-pedantic/safe-route-params`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```ts
@Controller("user")
class UserController {
  @Get("route/:id")
  getRouteById(@Param("invalid") invalid: string) {}

  notARoute(@Param("id") id: string) {}
}
```

✅ **Corrrect** code:

```ts
@Controller("user")
class UserController {
  @Get("route/:id")
  getRouteById(@Param("id") invalid: string) {}

  notARoute(id: string) {}
  // OR
  @Post("route/:id")
  notARoute(@Param("id") id: string) {}
}
```
