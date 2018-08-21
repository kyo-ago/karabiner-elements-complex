import assert = require("assert");
import { app } from "./app";

describe("app", () => {
    it("base", () => {
        assert(app({ ":app": "browsers" }).conditions.length === 1);
        assert(
            app({ ":app": "browsers" }).conditions[0].bundle_identifiers.length
        );
        assert(!(":app" in app({ ":app": "browsers" })));
        assert(
            app({ ":app": "browsers", conditions: [{ type: "" }] }).conditions
                .length === 2
        );
        assert.deepStrictEqual(app({ ":app": "hoge" }), {
            conditions: [
                {
                    bundle_identifiers: ["hoge"],
                    type: "frontmost_application_if",
                },
            ],
        });
    });
});
