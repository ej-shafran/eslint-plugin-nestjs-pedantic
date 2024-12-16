"use strict";

import rule from "../lib/rules/no-duplicate-route-params.js";
import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester();

ruleTester.run("no-duplicate-route-params", rule, {
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
      name: "should ignore non-duplicate param decorators",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  getChildrenById() {}",
        "}",
      ].join("\n"),
    },
  ],

  invalid: [
    {
      name: "should flag duplicate route parameters",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get(':id/children/:id')",
        "  getChildrenById() {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "duplicateRouteParam",
          data: {
            param: "id",
          },
        },
      ],
    },
  ],
});
