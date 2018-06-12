import { ComplexModificationFile } from "./read_complex_modifications";
import { json_transform } from "./rules/json_transform";
import {
    ComplexModificationRule,
    ComplexModificationRuleSet,
} from "./rules/make_rules";
import { only_filter } from "./rules/only_filter";

export function read_rules(
    files: ComplexModificationFile[]
): ComplexModificationRule[] {
    let results = files.map(
        (file): ComplexModificationRuleSet => {
            try {
                let json = eval(`(${file.textContent})`);
                return json_transform(json, file.fileName);
            } catch (e) {
                console.error(e.message, file.fileName);
            }
        }
    );
    return only_filter(results);
}
