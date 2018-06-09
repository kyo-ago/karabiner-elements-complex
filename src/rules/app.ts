import { Manipulator, ManipulatorConditions } from "../make_rules";

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

export function app(manip: Manipulator): Manipulator {
    if (!manip[":app"]) {
        return manip;
    }
    manip.conditions = (manip.conditions || []).concat(
        toConditionApp(manip[":app"])
    );
    delete manip[":app"];
    return manip;
}
