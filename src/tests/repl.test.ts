import { cleanInput } from "../repl.js";
import { describe, expect, test } from "vitest";

const testCasesForCleanInput = [
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "  hel  NO  ",
    expected: ["hel", "no"],
  },
  {
    input: "  Trallalla  Land  ",
    expected: ["trallalla", "land"],
  },
];

describe.each(testCasesForCleanInput)(
  "cleanInput($input)",
  ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
      const actual = cleanInput(input);

      // The `expect` and `toHaveLength` functions are from vitest
      // they will fail the test if the condition is not met
      expect(actual).toHaveLength(expected.length);
      for (const i in expected) {
        // likewise, the `toBe` function will fail the test
        // if the values are not equal
        expect(actual[i]).toBe(expected[i]);
      }
    });
  },
);
