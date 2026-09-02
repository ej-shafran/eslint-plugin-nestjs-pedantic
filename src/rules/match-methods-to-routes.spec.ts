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

    {
      name: "should ignore a proper method name for array routes",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get(['users', 'posts'])",
        "  getUsersOrPosts() {}",
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
          suggestions: [
            {
              messageId: "renameMethod",
              data: { expected: "getChildrenById" },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get('children/:id')",
                "  getChildrenById() {}",
                "",
                "  @Post('wow')",
                "  somethingElse() {}",
                "",
                "  @Patch('user-name/:id/:role')",
                "  somethingElse() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
        {
          messageId: "matchMethodsToRoutes",
          data: {
            definition: "@Post('wow')",
            expected: "postWow",
          },
          suggestions: [
            {
              messageId: "renameMethod",
              data: { expected: "postWow" },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get('children/:id')",
                "  somethingElse() {}",
                "",
                "  @Post('wow')",
                "  postWow() {}",
                "",
                "  @Patch('user-name/:id/:role')",
                "  somethingElse() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
        {
          messageId: "matchMethodsToRoutes",
          data: {
            definition: "@Patch('user-name/:id/:role')",
            expected: "patchUserNameByIdByRole",
          },
          suggestions: [
            {
              messageId: "renameMethod",
              data: { expected: "patchUserNameByIdByRole" },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get('children/:id')",
                "  somethingElse() {}",
                "",
                "  @Post('wow')",
                "  somethingElse() {}",
                "",
                "  @Patch('user-name/:id/:role')",
                "  patchUserNameByIdByRole() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
      output: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  getChildrenById() {}",
        "",
        "  @Post('wow')",
        "  postWow() {}",
        "",
        "  @Patch('user-name/:id/:role')",
        "  patchUserNameByIdByRole() {}",
        "}",
      ].join("\n"),
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
          suggestions: [
            {
              messageId: "renameMethod",
              data: { expected: "get" },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get()",
                "  get() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
      output: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get()",
        "  get() {}",
        "}",
      ].join("\n"),
    },
    {
      name: "should flag incorrect method names for array routes",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get(['users', 'posts'])",
        "  somethingElse() {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "matchMethodsToRoutes",
          data: {
            definition: "@Get(['users', 'posts'])",
            expected: "getUsersOrPosts",
          },
          suggestions: [
            {
              messageId: "renameMethod",
              data: { expected: "getUsersOrPosts" },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get(['users', 'posts'])",
                "  getUsersOrPosts() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
      output: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get(['users', 'posts'])",
        "  getUsersOrPosts() {}",
        "}",
      ].join("\n"),
    },
    {
      name: "should flag incorrect method names for array routes with params",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get(['users/:id', 'posts/:id'])",
        "  somethingElse() {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "matchMethodsToRoutes",
          data: {
            definition: "@Get(['users/:id', 'posts/:id'])",
            expected: "getUsersByIdOrPostsById",
          },
          suggestions: [
            {
              messageId: "renameMethod",
              data: { expected: "getUsersByIdOrPostsById" },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get(['users/:id', 'posts/:id'])",
                "  getUsersByIdOrPostsById() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
      output: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get(['users/:id', 'posts/:id'])",
        "  getUsersByIdOrPostsById() {}",
        "}",
      ].join("\n"),
    },
  ],
});
