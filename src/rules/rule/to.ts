import { Manipulator } from "../make_rules";
import { parse_shortcut } from "./libs/parse_shortcut";
import { remove_property } from "./libs/remove_property";
import { shortcut_to_modifier } from "./libs/shortcut_to_modifier";

export interface ToModifier {
    key_code: string;
    modifiers?: string[];
}

export function toModifier(
    base: ToModifier[] | void,
    short: string
): ToModifier[] {
    let results = short
        .split(/,/)
        .filter(short => short)
        .reduce((base: ToModifier[], short: string) => {
            if (!short.match(/^'.+?'$/)) {
                let keys = parse_shortcut(short);
                let result: ToModifier = {
                    key_code: keys.pop() || "",
                };
                if (keys.length) {
                    result.modifiers = keys;
                }
                return base.concat(result);
            }
            return base.concat(shortcut_to_modifier(short));
        }, []);
    return (base || []).concat(results);
}

export const to = remove_property(
    ":to",
    (manip: Manipulator, prop: string): Manipulator => {
        manip.to = toModifier(manip.to, prop);
        return manip;
    }
);
