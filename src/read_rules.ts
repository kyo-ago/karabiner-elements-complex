import { make_rules } from "./make_rules";
import { ComplexModificationFile } from "./read_complex_modifications";

export function read_rules(files: ComplexModificationFile[]) {
    return files
        .map(file => {
            try {
                return make_rules(file.textContent);
            } catch (e) {
                console.error(e.message, file.fileName);
            }
        })
        .reduce((base, cur) => base.concat(cur), []);
}
