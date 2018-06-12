import { ComplexModificationRuleSet, make_rules } from "./make_rules";
import { map_rule } from "./map_rule";

export function json_transform(
    json: any,
    fileName: string
): ComplexModificationRuleSet {
    let ruleSet = make_rules(json);
    ruleSet.rules = ruleSet.rules.map(rule => map_rule(rule, fileName));
    return ruleSet;
}
