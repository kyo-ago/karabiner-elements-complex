import { ManipulatorConditions } from "../make_rules";
import { condition_map } from "./libs/condition_map";

export interface LangInputSources {
    language: string;
}

let toConditionLanguage = (lang: string): ManipulatorConditions => ({
    type: "input_source_if",
    input_sources: [{ language: lang }],
});

export const lang = condition_map(":lang", toConditionLanguage);
