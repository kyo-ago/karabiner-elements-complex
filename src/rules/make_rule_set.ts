import {
  ComplexModificationRule,
  ComplexModificationRuleSet,
} from "./make_rules";

export function make_rule_set(
  rules: ComplexModificationRule[]
): ComplexModificationRuleSet {
  if (!rules.find((rule) => rule[":only"])) {
    return {
      only: false,
      rules: rules,
    };
  }
  return {
    only: true,
    rules: rules.map((rule) => {
      delete rule[":only"];
      return rule;
    }),
  };
}
