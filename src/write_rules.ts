import { Rule } from "./rules/make_rule";

let fs = require("fs");

export function write_rules(rules: Rule[]) {
    let karabinerJsonPath = `${
        process.env.HOME
    }/.config/karabiner/karabiner.json`;
    let karabinerJson = require(karabinerJsonPath);
    karabinerJson.profiles
        .filter(profile => profile.selected)
        .forEach(profile => (profile.complex_modifications.make_rule = rules));
    fs.writeFileSync(
        karabinerJsonPath,
        JSON.stringify(karabinerJson, null, "  ")
    );
}
