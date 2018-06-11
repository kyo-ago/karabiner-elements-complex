import { ComplexModificationFile } from "../read_complex_modifications";
import { json_to_rule } from "./json_to_rule";
import { make_rule } from "./make_rule";
import { map_rule } from "./map_rule";
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

export function make_rules(
    file: ComplexModificationFile
): ComplexModificationRuleSet {
    let json = eval(`(${file.textContent})`);
    let rules = json_to_rule(json).map(rule => make_rule(rule));
    let only = false;
    if (rules.find(rule => rule[":only"])) {
        only = true;
        rules = rules.filter(rule => rule[":only"]).map(rule => {
            delete rule[":only"];
            return rule;
        });
    }
    return {
        only: only,
        rules: rules.map(rule => map_rule(rule, file.fileName)),
    };
}
