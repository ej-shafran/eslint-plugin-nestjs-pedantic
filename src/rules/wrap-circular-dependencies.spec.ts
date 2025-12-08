import rule from "./wrap-circular-dependencies.js";
import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester();

ruleTester.run("wrap-circular-dependencies", rule, {
  valid: [
    {
      name: "should ignore wrapped circular dependencies",
      code: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    other: Relation<OtherService>",
        "  ) {}",
        "}",
      ].join("\n"),
    },
  ],
  invalid: [
    {
      name: "should flag unwrapped circular dependencies",
      code: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    other: OtherService",
        "  ) {}",
        "}",
      ].join("\n"),
      output: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    other: Circular<OtherService>",
        "  ) {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "unwrappedCircularDependency",
          suggestions: [
            {
              messageId: "wrapWithCircular",
              data: { typeName: "OtherService" },
              output: [
                "export class Service {",
                "  constructor(",
                "    @Inject(forwardRef(() => OtherService))",
                "    other: Circular<OtherService>",
                "  ) {}",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
    {
      name: "should work for parameter properties",
      code: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    private readonly other: OtherService",
        "  ) {}",
        "}",
      ].join("\n"),
      output: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    private readonly other: Circular<OtherService>",
        "  ) {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "unwrappedCircularDependency",
          suggestions: [
            {
              messageId: "wrapWithCircular",
              data: { typeName: "OtherService" },
              output: [
                "export class Service {",
                "  constructor(",
                "    @Inject(forwardRef(() => OtherService))",
                "    private readonly other: Circular<OtherService>",
                "  ) {}",
                "}",
              ].join("\n"),
            },
          ],
        },
      ],
    },
  ],
});
