import { Manipulator } from "../make_rules";
import { parse_shortcut } from "./libs/parse_shortcut";
import { remove_property } from "./libs/remove_property";

let toModifierMap: {
    [key: string]: {
        key: string;
        mod?: string;
    };
} = {
    "(": {
        key: "9",
        mod: "shift",
    },
    ")": {
        key: "0",
        mod: "shift",
    },
    "{": {
        key: "open_bracket",
        mod: "shift",
    },
    "}": {
        key: "close_bracket",
        mod: "shift",
    },
    "<": {
        key: "comma",
        mod: "shift",
    },
    ">": {
        key: "period",
        mod: "shift",
    },
    '"': {
        key: "quote",
        mod: "shift",
    },
    "'": {
        key: "quote",
    },
    ",": {
        key: "comma",
    },
    ".": {
        key: "period",
    },
    " ": {
        key: "spacebar",
    },
    "=": {
        key: "equal_sign",
    },
    ";": {
        key: "semicolon",
    },
    ":": {
        key: "semicolon",
        mod: "shift",
    },
};


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
            let results = short
                .replace(/^'(.+?)'$/, "$1")
                .split(/(?:)/)
                .map(
                    (key: string): ToModifier => {
                        if (!toModifierMap[key]) {
                            if (key.toLowerCase() === key) {
                                return { key_code: key };
                            }
                            return {
                                key_code: key.toLowerCase(),
                                modifiers: ["shift"],
                            };
                        }
                        let mod = toModifierMap[key]["mod"];
                        if (!mod) {
                            return { key_code: toModifierMap[key]["key"] };
                        }
                        return {
                            key_code: toModifierMap[key]["key"],
                            modifiers: [mod],
                        };
                    }
                );
            return base.concat(results);
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
