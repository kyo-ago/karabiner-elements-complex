import * as assert from "assert";
import { make_rule } from "./make_rule";

describe("make_rule", () => {
    it("base", () => {
        assert.deepStrictEqual(make_rule([1, 2, 3]), {
            manipulators: [1, 2, 3],
        });

        assert.deepStrictEqual(
            make_rule({
                ":manipulators": [1, 2, 3],
            }),
            {
                manipulators: [1, 2, 3],
            }
        );

        assert.deepStrictEqual(
            make_rule({
                ":manipulators": { key: "val" },
            }),
            {
                manipulators: [{ key: "val" }],
            }
        );
    });
});
