import { Manipulator } from "../make_rules";

export function string_shortcut(
  manip: Manipulator | string,
): Manipulator | string {
  if ("string" !== typeof manip) {
    return manip;
  }
  let kv = manip.split(":");
  if (kv.length === 1) {
    return manip;
  }
  let result: any = {};
  result[":" + (kv.shift() || "").trim()] = kv.join(":").trim();
  return result;
}
