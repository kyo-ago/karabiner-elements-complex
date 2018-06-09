import { ManipulatorConditions } from "../make_rules";
import { condition_map } from "./libs/condition_map";

let conditionAppMap = {
    browsers: [
        "^com\\.google\\.Chrome$",
        "^org\\.mozilla\\.firefox$",
        "^com\\.apple\\.Safari$",
    ],
    chrome: ["^com\\.google\\.Chrome$"],
    jetbrains: ["^com\\.jetbrains\\."],
};

let toConditionApp = (condition: string): ManipulatorConditions => {
    if (conditionAppMap[condition]) {
        return {
            type: "frontmost_application_if",
            bundle_identifiers: conditionAppMap[condition],
        };
    }
    if (condition.match(/^!/) && conditionAppMap[condition.replace(/^!/, "")]) {
        return {
            type: "frontmost_application_unless",
            bundle_identifiers: [conditionAppMap[condition.replace(/^!/, "")]],
        };
    }
    throw new Error(`Unknown ConditionAppMap "${condition}"`);
};

export const app = condition_map(":app", toConditionApp);
