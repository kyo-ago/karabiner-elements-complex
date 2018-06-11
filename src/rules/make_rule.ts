import { ComplexModificationRule } from "./make_rules";

export function make_rule(rule: any): ComplexModificationRule {
    if (rule.length) {
        return {
            manipulators: rule,
        };
    }
    if (rule[":manipulators"]) {
        rule.manipulators = (rule.manipulators || []).concat(
            rule[":manipulators"]
        );
        delete rule[":manipulators"];
    }
    return rule;
}
