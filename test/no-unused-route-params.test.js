"use strict";

const rule = require("../lib/rules/no-unused-route-params");
const { RuleTester } = require("@typescript-eslint/rule-tester");

const ruleTester = new RuleTester();

ruleTester.run("no-unused-route-params", rule, {
  valid: [
    {
      name: "should ignore unrelated cases",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  nonRouteMethod() {}",
        "",
        "  @Get()",
        "  get() {}",
        "}",
      ].join("\n"),
    },
    {
      name: "should ignore used param decorators",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  getChildrenById(@Param('id') id: string) {}",
        "}",
      ].join("\n"),
    },
    {
      name: "should ignore a call to `Param` without arguments",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  getChildrenById(@Param() params: object) {}",
        "}",
      ].join("\n"),
    },
  ],

  invalid: [
    {
      name: "should flag unused route parameters",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  getChildrenById() {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "unusedRouteParam",
          data: {
            param: "id",
          },
          suggestions: [
            {
              messageId: "removeRouteParam",
              data: {
                param: "id",
              },
              output: [
                "@Controller('user')",
                "export class UserController {",
                '  @Get("children")',
                "  getChildrenById() {}",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
  ],
});
