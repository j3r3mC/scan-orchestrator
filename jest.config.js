const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",

  transform: {
    ...tsJestTransformCfg,
  },

  // ⭐ Ignore dist/
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // ⭐⭐ Correction essentielle pour les imports @/
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
