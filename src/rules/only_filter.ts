import {
  ComplexModificationRule,
  ComplexModificationRuleSet,
} from "./make_rules";

export function only_filter(
  rules: ComplexModificationRuleSet[],
): ComplexModificationRule[] {
  let isOnly = rules.find((rule) => rule.only);
  let filteredRules = isOnly ? rules.filter((rule) => rule.only) : rules;
  return filteredRules
    .map((rule) => rule.rules)
    .reduce((base, cur) => base.concat(cur), []);
}
