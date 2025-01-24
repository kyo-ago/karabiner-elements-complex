import { ManipulatorConditions } from "../make_rules";
import { condition_map } from "./libs/condition_map";

let conditionAppMap = {
  browsers: [
    "^com\\.google\\.Chrome$",
    "^org\\.mozilla\\.firefox$",
    "^com\\.apple\\.Safari$",
    "^company\\.thebrowser\\.Browser$",
  ],
  chrome: ["^com\\.google\\.Chrome$"],
  arc: ["^company\\.thebrowser\\.Browser$"],
  jetbrains: ["^com\\.jetbrains\\."],
  "vscode-family": [
    "^com\\.todesktop\\.230313mzl4w4u92$",
    "^com\\.microsoft\\.VSCode$",
  ],
  cursor: ["^com\\.todesktop\\.230313mzl4w4u92$"],
  vscode: ["^com\\.microsoft\\.VSCode$"],
  slack: ["^com\\.tinyspeck\\.slackmacgap$"],
  finder: ["^com\\.apple\\.finder$"],
  terminal: ["^com\\.apple\\.Terminal$"],
};

export const app = condition_map(
  ":app",
  (condition: string): ManipulatorConditions => {
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
    return {
      type: "frontmost_application_if",
      bundle_identifiers: Array.isArray(condition) ? condition : [condition],
    };
  },
);
