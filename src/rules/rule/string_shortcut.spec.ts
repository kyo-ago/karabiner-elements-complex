import assert = require("assert");
import { string_shortcut } from "./string_shortcut";

describe("string_shortcut", () => {
    it("base", () => {
        assert.deepStrictEqual(
            string_shortcut({
                ":from": "hoge",
            }),
            {
                ":from": "hoge",
            }
        );

        assert.deepStrictEqual(string_shortcut("hoge:huga"), {
            ":hoge": "huga",
        });

        assert.deepStrictEqual(string_shortcut("hoge:huga:foo"), {
            ":hoge": "huga:foo",
        });

        assert(string_shortcut("key"), "key");
    });
});
