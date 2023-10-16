import * as assert from "assert";
import { to } from "./to";

describe("to", () => {
  it("base", () => {
    assert.deepStrictEqual(
      to({
        ":to": "a",
      }),
      {
        to: [
          {
            key_code: "a",
          },
        ],
      },
    );

    assert.deepStrictEqual(
      to({
        ":to": "cmd-a",
      }),
      {
        to: [
          {
            key_code: "a",
            modifiers: ["command"],
          },
        ],
      },
    );
  });
});
