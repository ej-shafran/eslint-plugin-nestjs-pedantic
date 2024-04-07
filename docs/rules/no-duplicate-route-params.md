# Disallow duplicate route parameters (`nestjs-pedantic/no-duplicate-route-params`)

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`.

<!-- end auto-generated rule header -->

## Rule Details

❌ **Incorrect** code:

```ts
@Controller("user")
class UserController {
  @Get(":id/route/:id")
  getByIdRouteById() {}
}
```

✅ **Corrrect** code:

```ts
@Controller("user")
class UserController {
  @Get("route/:id")
  getRouteById() {}
}
```
