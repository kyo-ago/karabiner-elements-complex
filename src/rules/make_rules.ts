import { json_to_rule } from "./json_to_rule";
import { make_rule } from "./make_rule";
import { make_rule_set } from "./make_rule_set";
import { DeviceIdentifiers } from "./rule/device";
import { FromModifier } from "./rule/from";
import { LangInputSources } from "./rule/lang";
import { ToModifier } from "./rule/to";

export interface ManipulatorConditions {
  type: string;
  bundle_identifiers?: string[];
  identifiers?: DeviceIdentifiers[];
  input_sources?: LangInputSources[];
}

export interface Manipulator {
  type?: string;
  conditions?: ManipulatorConditions[];
  from?: FromModifier;
  to?: ToModifier[];

  ":from"?: string;
  ":to"?: string;
  ":app"?: string;
  ":device"?: string;
  ":lang"?: string;
}

export interface ComplexModificationRule {
  description?: string;
  manipulators?: Manipulator[];
  ":manipulators"?: Manipulator | Manipulator[];
  ":only"?: boolean;
}

export interface ComplexModificationRuleSet {
  only: boolean;
  rules: ComplexModificationRule[];
}

export function make_rules(json: any): ComplexModificationRuleSet {
  let rules = json_to_rule(json).map((rule) => make_rule(rule));
  return make_rule_set(rules);
}
