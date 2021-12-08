import * as assert from "assert";
import { json_to_rule } from "./json_to_rule";

describe("json_to_rule", () => {
  it("array", () => {
    assert.deepStrictEqual(
      json_to_rule([
        {
          description: "hoge",
        },
      ]),
      [
        {
          description: "hoge",
        },
      ]
    );

    assert.deepStrictEqual(
      json_to_rule([
        {
          hoge: "huga",
        },
      ]),
      [
        {
          manipulators: [
            {
              hoge: "huga",
            },
          ],
        },
      ]
    );
  });
  it("object", () => {
    assert.deepStrictEqual(
      json_to_rule({
        rules: [
          {
            description: "hoge",
          },
        ],
      }),
      [
        {
          description: "hoge",
        },
      ]
    );

    assert.deepStrictEqual(
      json_to_rule({
        description: "hoge",
      }),
      [
        {
          description: "hoge",
        },
      ]
    );
  });
});
