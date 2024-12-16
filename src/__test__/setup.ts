import * as vitest from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";

// Use Vitest for `RuleTester`
RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

RuleTester.setDefaultConfig({});
