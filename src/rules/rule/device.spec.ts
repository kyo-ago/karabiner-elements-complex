import * as assert from "assert";
import { device } from "./device";

describe("device", () => {
  it("base", () => {
    assert(device({ ":device": "barocco" }).conditions.length === 1);
    assert(device({ ":device": "barocco" }).conditions[0].identifiers.length);
    assert(!(":device" in device({ ":device": "barocco" })));
    assert(
      device({ ":device": "barocco", conditions: [{ type: "" }] }).conditions
        .length === 2,
    );
  });
});
