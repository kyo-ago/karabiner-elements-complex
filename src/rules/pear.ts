import { Manipulator } from "../make_rules";
import { fromModifier } from "./from";
import { toModifier } from "./to";

export function pear(manip: Manipulator): Manipulator {
    Object.keys(manip)
        .filter(key => key.match(/^:/))
        .forEach(key => {
            manip.from = fromModifier(manip.from, key.replace(/^:/, ""));
            manip.to = toModifier(manip.to, (<any>manip)[key]);
            delete (<any>manip)[key];
        });
    return manip;
}
