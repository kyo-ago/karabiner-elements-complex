import assert = require("assert");
import { pear } from "./pear";

describe("pear", () => {
    it("base", () => {
        assert.deepStrictEqual(
            pear(<any>{
                ":hoge": "huga",
            }),
            {
                from: {
                    key_code: "hoge",
                },
                to: [
                    {
                        key_code: "huga",
                    },
                ],
            }
        );

        assert.deepStrictEqual(
            pear(<any>{
                ":hoge": true,
            }),
            {
                ":hoge": true,
            }
        );

        assert.deepStrictEqual(
            pear(<any>{
                hoge: "huga",
            }),
            {
                hoge: "huga",
            }
        );
    });
});
