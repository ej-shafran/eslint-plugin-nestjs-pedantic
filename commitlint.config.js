/** @type {import("@commitlint/types").UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    (commit) => !!commit.match(/^\d\.\d\.\d$/),
    (message) => /^Bumps \[.+]\(.+\) from .+ to .+\.$/m.test(message),
  ],
};
