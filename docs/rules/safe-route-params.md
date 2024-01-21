# Ensure safe usage of the `@Param` decorator (`nestjs-pedantic/safe-route-params`)

💼 This rule is enabled in the 🌐 `all` config.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

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
