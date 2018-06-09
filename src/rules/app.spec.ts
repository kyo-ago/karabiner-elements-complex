import assert = require("assert");
import { app } from "./app";

describe("app", () => {
    it("base", () => {
        assert(app({ ":app": "browsers" }).conditions.length === 1);
        assert(
            app({ ":app": "browsers" }).conditions[0].bundle_identifiers.length
        );
        assert(!(":app" in app({ ":app": "browsers" })));
    });
});
