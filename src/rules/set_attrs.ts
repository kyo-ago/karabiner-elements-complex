import { ComplexModificationRule } from "../make_rules";

export function set_attrs(
    rule: ComplexModificationRule
): ComplexModificationRule {
    let attrs = Object.keys(rule)
        .filter(key => key.match(/^:/))
        .filter(key => "string" === typeof rule[key])
        .reduce((base, cur) => {
            base[cur] = rule[cur];
            delete rule[cur];
            return base;
        }, {});
    rule.manipulators = rule.manipulators.map(manip =>
        Object.assign({}, manip, attrs)
    );
    return rule;
}
