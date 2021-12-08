import * as fs from "fs";
import { ComplexModificationRule } from "./rules/make_rules";

interface KarabinerJsonProfile {
  selected: boolean;
  complex_modifications: {
    rules: ComplexModificationRule[];
  };
}

interface KarabinerJson {
  profiles: KarabinerJsonProfile[];
}

export function write_rules(rules: ComplexModificationRule[]) {
  let karabinerJsonPath = `${process.env.HOME}/.config/karabiner/karabiner.json`;
  let karabinerJson: KarabinerJson = eval(
    `(${fs.readFileSync(karabinerJsonPath, "utf-8")})`
  );
  karabinerJson.profiles
    .filter((profile) => profile.selected)
    .forEach((profile) => (profile.complex_modifications.rules = rules));
  fs.writeFileSync(
    karabinerJsonPath,
    JSON.stringify(karabinerJson, null, "  ")
  );
}
