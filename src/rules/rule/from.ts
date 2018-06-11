import { Manipulator } from "../make_rules";
import { parse_shortcut } from "./libs/parse_shortcut";
import { remove_property } from "./libs/remove_property";

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

export const from = remove_property(
    ":from",
    (manip: Manipulator, prop: string): Manipulator => {
        manip.from = fromModifier(manip.from, prop);
        return manip;
    }
);
