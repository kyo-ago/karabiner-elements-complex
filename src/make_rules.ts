import { app } from "./rules/app";
import { device, DeviceIdentifiers } from "./rules/device";
import { from, FromModifier } from "./rules/from";
import { lang, LangInputSources } from "./rules/lang";
import { make_rule, Rule } from "./rules/make_rule";
import { pear } from "./rules/pear";
import { string_shortcut } from "./rules/string_shortcut";
import { to, ToModifier } from "./rules/to";
import { type_basic } from "./rules/type_basic";

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
    ":from"?: string;
    to?: ToModifier[];
    ":to"?: string;
}

export function make_rules(text: string): Rule[] {
    let json: { rules: any[] } | any[] | any = eval(`(${text})`);
    return (json.rules || (json.length ? json : [json]))
        .map(make_rule)
        .map(rule =>
            rule.manipulators
                .map(string_shortcut)
                .map(type_basic)
                .map(app)
                .map(device)
                .map(lang)
                .map(from)
                .map(to)
                .map(pear)
        );
}
