import { Manipulator } from "../make_rules";

export function string_shortcut(manip: Manipulator | string): Manipulator {
    if ("string" !== typeof manip) {
        return manip;
    }
    let kv = manip.split(":");
    let result: any = {};
    result[":" + (kv.shift() || "").trim()] = kv.join(":").trim();
    return result;
}
