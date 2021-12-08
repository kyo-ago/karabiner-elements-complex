import { ToModifier } from "../to";

let toModifierMap: {
  [key: string]: {
    key: string;
    mod?: string;
  };
} = {
  "(": {
    key: "9",
    mod: "shift"
  },
  ")": {
    key: "0",
    mod: "shift"
  },
  "{": {
    key: "open_bracket",
    mod: "shift"
  },
  "}": {
    key: "close_bracket",
    mod: "shift"
  },
  "<": {
    key: "comma",
    mod: "shift"
  },
  ">": {
    key: "period",
    mod: "shift"
  },
  '"': {
    key: "quote",
    mod: "shift"
  },
  "'": {
    key: "quote"
  },
  ",": {
    key: "comma"
  },
  ".": {
    key: "period"
  },
  " ": {
    key: "spacebar"
  },
  "=": {
    key: "equal_sign"
  },
  ";": {
    key: "semicolon"
  },
  ":": {
    key: "semicolon",
    mod: "shift"
  }
};

export function shortcut_to_modifier(short: string): ToModifier[] {
  return short
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
            modifiers: ["shift"]
          };
        }
        let mod = toModifierMap[key]["mod"];
        if (!mod) {
          return { key_code: toModifierMap[key]["key"] };
        }
        return {
          key_code: toModifierMap[key]["key"],
          modifiers: [mod]
        };
      }
    );
}
