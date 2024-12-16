import rule from "./match-methods-to-routes.js";
import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester();

ruleTester.run("match-methods-to-routes", rule, {
  valid: [
    {
      name: "should ignore a proper method name",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  getChildrenById() {}",
        "}",
      ].join("\n"),
    },

    {
      name: "should ignore non-http-method decorators",
      code: [
        "class MyClass {",
        "  @Decorator('some-route')",
        "  somethingElse() {}",
        "}",
      ].join("\n"),
    },
  ],

  invalid: [
    {
      name: "should flag incorrect method names",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  somethingElse() {}",
        "",
        "  @Post('wow')",
        "  somethingElse() {}",
        "",
        "  @Patch('user-name/:id/:role')",
        "  somethingElse() {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "matchMethodsToRoutes",
          data: {
            definition: "@Get('children/:id')",
            expected: "getChildrenById",
          },
        },
        {
          messageId: "matchMethodsToRoutes",
          data: {
            definition: "@Post('wow')",
            expected: "postWow",
          },
        },
        {
          messageId: "matchMethodsToRoutes",
          data: {
            definition: "@Patch('user-name/:id/:role')",
            expected: "patchUserNameByIdByRole",
          },
        },
      ],
    },
    {
      name: "should flag empty calls",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get()",
        "  somethingElse() {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "matchMethodsToRoutes",
          data: {
            definition: "@Get()",
            expected: "get",
          },
        },
      ],
    },
  ],
});
