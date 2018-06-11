import { ComplexModificationRule, Manipulator } from "./make_rules";
import { app } from "./rules/app";
import { device } from "./rules/device";
import { from } from "./rules/from";
import { lang } from "./rules/lang";
import { pear } from "./rules/pear";
import { set_attrs } from "./rules/set_attrs";
import { string_shortcut } from "./rules/string_shortcut";
import { to } from "./rules/to";
import { type_basic } from "./rules/type_basic";

export function map_rule(
    json: ComplexModificationRule,
    fileName: string
): ComplexModificationRule {
    let {rule, attr} = set_attrs(json);
    rule.description = rule.description || fileName.replace(/\.\w+/, "");
    rule.manipulators = rule.manipulators
        .map(string_shortcut)
        .map((manip: Manipulator): Manipulator => Object.assign({}, manip, attr))
        .map(type_basic)
        .map(app)
        .map(device)
        .map(lang)
        .map(from)
        .map(to)
        .map(pear);
    return rule;
}
