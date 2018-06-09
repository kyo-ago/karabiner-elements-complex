import { ComplexModificationRule } from "./make_rules";

export function json_to_rule(json: any): ComplexModificationRule[] {
    if (json.length) {
        if (json.find(rule => rule.description)) {
            return json;
        }
        return [
            {
                manipulators: json,
            },
        ];
    }
    return json.rules || [json];
}
