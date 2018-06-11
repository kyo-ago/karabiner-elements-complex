import { json_to_rule } from "./json_to_rule";
import { map_rule } from "./map_rule";
import { ComplexModificationFile } from "./read_complex_modifications";
import { DeviceIdentifiers } from "./rules/device";
import { FromModifier } from "./rules/from";
import { LangInputSources } from "./rules/lang";
import { make_rule } from "./rules/make_rule";
import { ToModifier } from "./rules/to";

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

export function make_rules(
    file: ComplexModificationFile
): {
    only: boolean;
    rules: ComplexModificationRule[];
} {
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
