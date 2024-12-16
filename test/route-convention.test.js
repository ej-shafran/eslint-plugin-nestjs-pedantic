"use strict";

import rule from "../lib/rules/route-convention.js";
import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester();

ruleTester.run("route-convention", rule, {
  valid: [
    {
      name: "should ignore route definitions without trailing slashes",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  getChildrenById() {}",
        "}",
      ].join("\n"),
    },

    {
      name: "should ignore empty route definitions",
      code: [
        "@Controller()",
        "export class UserController {",
        "  @Get()",
        "  get() {}",
        "}",
      ].join("\n"),
    },
  ],

  invalid: [
    {
      name: "should flag non-conventional route definitions",
      code: [
        "@Controller('/user')",
        "export class UserController {",
        "  @Get('/children/:id')",
        "  getChildrenById() {}",
        "",
        "  @Post('wow/')",
        "  postWow() {}",
        "",
        "  @Patch('/user-name/')",
        "  patchUserName() {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "noTrailingSlashes",
          data: {
            definition: "@Controller('/user')",
          },
          suggestions: [
            {
              messageId: "removeSlashes",
              output: [
                '@Controller("user")',
                "export class UserController {",
                "  @Get('/children/:id')",
                "  getChildrenById() {}",
                "",
                "  @Post('wow/')",
                "  postWow() {}",
                "",
                "  @Patch('/user-name/')",
                "  patchUserName() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
        {
          messageId: "noTrailingSlashes",
          data: {
            definition: "@Get('/children/:id')",
          },
          suggestions: [
            {
              messageId: "removeSlashes",
              output: [
                "@Controller('/user')",
                "export class UserController {",
                '  @Get("children/:id")',
                "  getChildrenById() {}",
                "",
                "  @Post('wow/')",
                "  postWow() {}",
                "",
                "  @Patch('/user-name/')",
                "  patchUserName() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
        {
          messageId: "noTrailingSlashes",
          data: {
            definition: "@Post('wow/')",
          },
          suggestions: [
            {
              messageId: "removeSlashes",
              output: [
                "@Controller('/user')",
                "export class UserController {",
                "  @Get('/children/:id')",
                "  getChildrenById() {}",
                "",
                '  @Post("wow")',
                "  postWow() {}",
                "",
                "  @Patch('/user-name/')",
                "  patchUserName() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
        {
          messageId: "noTrailingSlashes",
          data: {
            definition: "@Patch('/user-name/')",
          },
          suggestions: [
            {
              messageId: "removeSlashes",
              output: [
                "@Controller('/user')",
                "export class UserController {",
                "  @Get('/children/:id')",
                "  getChildrenById() {}",
                "",
                "  @Post('wow/')",
                "  postWow() {}",
                "",
                '  @Patch("user-name")',
                "  patchUserName() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
      output: [
        '@Controller("user")',
        "export class UserController {",
        '  @Get("children/:id")',
        "  getChildrenById() {}",
        "",
        '  @Post("wow")',
        "  postWow() {}",
        "",
        '  @Patch("user-name")',
        "  patchUserName() {}",
        "}",
      ].join("\n"),
    },
  ],
});
