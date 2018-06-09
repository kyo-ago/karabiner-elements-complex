import { ComplexModificationRule, make_rules } from "./make_rules";
import { ComplexModificationFile } from "./read_complex_modifications";

export function read_rules(
    files: ComplexModificationFile[]
): ComplexModificationRule[] {
    let results = files.map(file => {
        try {
            return make_rules(file);
        } catch (e) {
            console.error(e.message, file.fileName);
        }
    });
    let rules;
    if (results.find(rule => rule.only)) {
        rules = results.filter(rule => rule.only).map(rule => rule.rules);
    } else {
        rules = results.map(rule => rule.rules);
    }
    return rules.reduce((base, cur) => base.concat(cur), []);
}
