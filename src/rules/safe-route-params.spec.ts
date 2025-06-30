import rule from "./safe-route-params.js";
import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester();

ruleTester.run("safe-route-params", rule, {
  valid: [
    {
      name: "should ignore safe param decorators",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id')",
        "  getChildrenById(@Param('id') id: string) {}",
        "}",
      ].join("\n"),
    },

    {
      name: "should ignore decorators which are not `Param`",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:otherId')",
        "  getChildrenById(@Query('id') id: string) {}",
        "}",
      ].join("\n"),
    },
  ],

  invalid: [
    {
      name: "should flag param decorators on non-route methods",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  getChildrenById(@Param('id') id: string) {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "missingRouteDefinition",
        },
      ],
    },
    {
      name: "should point out invalid `Param` calls",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get('children/:id/:otherParameter')",
        "  getChildrenByIdByOtherParameter(@Param('invalid') invalid: string) {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "invalidParamName",
          data: {
            definition: "@Get('children/:id/:otherParameter')",
          },
          suggestions: [
            {
              messageId: "replaceWithOtherParam",
              data: {
                otherParam: "id",
              },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get('children/:id/:otherParameter')",
                '  getChildrenByIdByOtherParameter(@Param("id") invalid: string) {}',
                "}",
              ].join("\n"),
            },
            {
              messageId: "replaceWithOtherParam",
              data: {
                otherParam: "otherParameter",
              },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get('children/:id/:otherParameter')",
                '  getChildrenByIdByOtherParameter(@Param("otherParameter") invalid: string) {}',
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
    {
      name: "should point out invalid `Param` calls (including prefixes)",
      code: [
        "@Controller('user')",
        "export class UserController {",
        "  @Get(':validParam')",
        '  getByValidParam(@Param("validPar") validParam: string) {}',
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "invalidParamName",
          data: { definition: "@Get(':validParam')" },
          suggestions: [
            {
              messageId: "replaceWithOtherParam",
              data: { otherParam: "validParam" },
              output: [
                "@Controller('user')",
                "export class UserController {",
                "  @Get(':validParam')",
                '  getByValidParam(@Param("validParam") validParam: string) {}',
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
  ],
});
