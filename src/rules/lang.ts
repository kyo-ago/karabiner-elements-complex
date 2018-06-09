import { ManipulatorConditions } from "../make_rules";

export interface LangInputSources {
    language: string;
}

let toConditionLanguage = (lang: string): ManipulatorConditions => ({
    type: "input_source_if",
    input_sources: [{ language: lang }],
});

export function lang(manip) {
    if (!manip[":lang"]) {
        return manip;
    }
    manip.conditions = (manip.conditions || []).concat(
        toConditionLanguage(manip[":lang"])
    );
    delete manip[":lang"];
    return manip;
}
