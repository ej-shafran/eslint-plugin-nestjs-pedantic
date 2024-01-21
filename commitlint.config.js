/** @type {import("@commitlint/types").UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  ignores: [(commit) => commit.match(/^\d\.\d\.\d$/)],
};
