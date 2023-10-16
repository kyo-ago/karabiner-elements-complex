import * as assert from "assert";
import { only_filter } from "./only_filter";

describe("only_filter", () => {
  it("base", () => {
    assert.deepStrictEqual(
      only_filter([
        {
          only: false,
          rules: [
            {
              description: "not only1",
            },
          ],
        },
        {
          only: true,
          rules: [
            {
              description: "only",
            },
          ],
        },
        {
          only: false,
          rules: [
            {
              description: "not only2",
            },
          ],
        },
      ]),
      [
        {
          description: "only",
        },
      ],
    );

    assert.deepStrictEqual(
      only_filter([
        {
          only: false,
          rules: [
            {
              description: "not only1",
            },
          ],
        },
        {
          only: false,
          rules: [
            {
              description: "not only2",
            },
          ],
        },
      ]),
      [
        {
          description: "not only1",
        },
        {
          description: "not only2",
        },
      ],
    );
  });
});
