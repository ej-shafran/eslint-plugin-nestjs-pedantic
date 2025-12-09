import rule from "./no-mismatched-forward-refs.js";
import { RuleTester } from "@typescript-eslint/rule-tester";

const ruleTester = new RuleTester();

ruleTester.run("no-mismatched-forward-refs", rule, {
  valid: [
    {
      name: "should ignore non-forwarded injections",
      code: [
        "export class Service {",
        "  constructor(",
        "    @Inject(SERVICE_IDENTIFIER)",
        "    other: OtherService",
        "  ) {}",
        "}",
      ].join("\n"),
    },
    {
      name: "should ignore correct `forwardRef` calls",
      code: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    other: OtherService",
        "  ) {}",
        "}",
      ].join("\n"),
    },
    {
      name: "should ignore correct generic wrappers",
      code: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    other: Circular<OtherService>,",
        "    @Inject(forwardRef(() => OtherService))",
        "    other2: Relation<OtherService>,",
        "  ) {}",
        "}",
      ].join("\n"),
    },
  ],
  invalid: [
    {
      name: "should flag mismatched forwardRef calls",
      code: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    other: ThirdService",
        "  ) {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "mismatchedForwardRef",
          suggestions: [
            {
              messageId: "replaceForwardedRef",
              output: [
                "export class Service {",
                "  constructor(",
                "    @Inject(forwardRef(() => ThirdService))",
                "    other: ThirdService",
                "  ) {}",
                "}",
              ].join("\n"),
              data: {
                annotatedType: "ThirdService",
                forwardedRef: "OtherService",
              },
            },
            {
              messageId: "replaceAnnotatedType",
              output: [
                "export class Service {",
                "  constructor(",
                "    @Inject(forwardRef(() => OtherService))",
                "    other: OtherService",
                "  ) {}",
                "}",
              ].join("\n"),
              data: {
                annotatedType: "ThirdService",
                forwardedRef: "OtherService",
              },
            },
          ],
        },
      ],
    },
    {
      name: "should flag incorrect generic wrappers",
      code: [
        "export class Service {",
        "  constructor(",
        "    @Inject(forwardRef(() => OtherService))",
        "    other: NonNullable<ThirdService>",
        "  ) {}",
        "}",
      ].join("\n"),
      errors: [
        {
          messageId: "mismatchedForwardRef",
          suggestions: [
            {
              messageId: "replaceAnnotatedType",
              output: [
                "export class Service {",
                "  constructor(",
                "    @Inject(forwardRef(() => OtherService))",
                "    other: OtherService",
                "  ) {}",
                "}",
              ].join("\n"),
              data: {
                annotatedType: "NonNullable<ThirdService>",
                forwardedRef: "OtherService",
              },
            },
          ],
        },
      ],
    },
  ],
});
