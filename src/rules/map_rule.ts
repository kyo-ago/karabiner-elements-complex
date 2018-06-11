import { ComplexModificationRule, Manipulator } from "./make_rules";
import { app } from "./rule/app";
import { device } from "./rule/device";
import { from } from "./rule/from";
import { lang } from "./rule/lang";
import { pear } from "./rule/pear";
import { string_shortcut } from "./rule/string_shortcut";
import { to } from "./rule/to";
import { set_attrs } from "./set_attrs";
import { type_basic } from "./type_basic";

export function map_rule(
    json: ComplexModificationRule,
    fileName: string
): ComplexModificationRule {
    let { rule, attr } = set_attrs(json);
    rule.description = rule.description || fileName.replace(/\.\w+/, "");
    rule.manipulators = rule.manipulators
        .map(string_shortcut)
        .map(
            (manip: Manipulator): Manipulator => Object.assign({}, manip, attr)
        )
        .map(type_basic)
        .map(app)
        .map(device)
        .map(lang)
        .map(from)
        .map(to)
        .map(pear);
    return rule;
}
