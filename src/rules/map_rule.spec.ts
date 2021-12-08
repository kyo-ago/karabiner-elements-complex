import * as assert from "assert";
import { map_rule } from "./map_rule";

describe("map_rule", () => {
  it("base", () => {
    assert.deepStrictEqual(
      map_rule(
        {
          manipulators: [],
        },
        "file name"
      ),
      {
        description: "file name",
        manipulators: [],
      }
    );

    assert.deepStrictEqual(
      map_rule(
        {
          description: "hoge",
          manipulators: [],
        },
        "file name"
      ),
      {
        description: "hoge",
        manipulators: [],
      }
    );

    assert.deepStrictEqual(
      map_rule(
        <any>{
          ":app": "chrome",
          manipulators: [
            "*-shift-a:'a','b',shift",
            {
              ":from": "a",
              ":to": "b",
            },
          ],
        },
        "file name"
      ),
      {
        description: "file name",
        manipulators: [
          {
            conditions: [
              {
                bundle_identifiers: ["^com\\.google\\.Chrome$"],
                type: "frontmost_application_if",
              },
            ],
            from: {
              key_code: "a",
              modifiers: {
                mandatory: ["shift"],
                optional: ["any"],
              },
            },
            to: [
              {
                key_code: "a",
              },
              {
                key_code: "b",
              },
              {
                key_code: "shift",
              },
            ],
            type: "basic",
          },
          {
            conditions: [
              {
                bundle_identifiers: ["^com\\.google\\.Chrome$"],
                type: "frontmost_application_if",
              },
            ],
            from: {
              key_code: "a",
            },
            to: [
              {
                key_code: "b",
              },
            ],
            type: "basic",
          },
        ],
      }
    );
  });
});
