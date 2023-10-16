import { ManipulatorConditions } from "../make_rules";
import { condition_map } from "./libs/condition_map";

export interface LangInputSources {
  language: string;
}

export const lang = condition_map(
  ":lang",
  (lang: string): ManipulatorConditions => ({
    type: "input_source_if",
    input_sources: [{ language: lang }],
  }),
);
