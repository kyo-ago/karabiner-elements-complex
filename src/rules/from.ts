import { Manipulator } from "../make_rules";
import { parse_shortcut } from "./parse_shortcut";

export interface FromModifier {
    key_code: string;
    modifiers?: {
        optional?: string[];
        mandatory: string[];
    };
}

export function fromModifier(
    base: FromModifier | void,
    short: string
): FromModifier {
    let keys = parse_shortcut(short);
    let result: FromModifier = Object.assign(base || {}, {
        key_code: keys.pop(),
    });
    if (!keys.length) {
        return result;
    }
    result.modifiers = result.modifiers || {
        mandatory: [],
    };
    if (~keys.indexOf("any")) {
        result.modifiers.optional = ["any"];
        keys = keys.filter(key => key !== "any");
    }
    if (keys.find(key => key.includes("?"))) {
        let optional = keys
            .filter(key => key.includes("?"))
            .map(key => key.replace("?", ""));
        result.modifiers.optional = (result.modifiers.optional || []).concat(
            optional
        );
        keys = keys.filter(key => !key.includes("?"));
    }
    if (!keys.length) {
        return result;
    }
    result.modifiers.mandatory = keys;
    return result;
}

export function from(manip: Manipulator): Manipulator {
    if (!manip[":from"]) {
        return manip;
    }
    manip.from = fromModifier(manip.from, manip[":from"]);
    delete manip[":from"];
    return manip;
}
