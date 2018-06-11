import { ComplexModificationFile } from "./read_complex_modifications";
import { ComplexModificationRule, make_rules } from "./rules/make_rules";
import { only_filter } from "./rules/only_filter";

export function read_rules(
    files: ComplexModificationFile[]
): ComplexModificationRule[] {
    let results = files.map(file => {
        try {
            return make_rules(file);
        } catch (e) {
            console.error(e.message, file.fileName);
        }
    });
    return only_filter(results);
}
