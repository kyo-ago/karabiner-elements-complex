import assert = require("assert");
import { lang } from "./lang";

describe("lang", () => {
    it("base", () => {
        assert(lang({ ":lang": "en" }).conditions.length === 1);
        assert(lang({ ":lang": "en" }).conditions[0].input_sources.length);
        assert(!(":lang" in lang({ ":lang": "en" })));
        assert(
            lang({ ":lang": "en", conditions: [{ type: "" }] }).conditions
                .length === 2
        );
    });
});
