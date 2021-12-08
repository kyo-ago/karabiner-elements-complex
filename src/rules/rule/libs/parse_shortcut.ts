let modifierMap: { [key: string]: string } = {
  shift: "shift",
  cmd: "command",
  com: "command",
  opt: "option",
  alt: "alt",
  ctrl: "control",
  "*": "any"
};

export function parse_shortcut(shortcut: string): string[] {
  return shortcut.split("-").map(key => modifierMap[key] || key);
}
