import { Manipulator } from "../make_rules";

export function type_basic(manip: Manipulator): Manipulator {
    manip.type = manip.type || "basic";
    return manip;
}
