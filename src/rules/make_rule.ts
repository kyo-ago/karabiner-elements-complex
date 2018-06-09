import { Manipulator } from "../make_rules";

export interface Rule {
    description: string;
    ":manipulators"?: Manipulator | Manipulator[];
    manipulators: Manipulator[];
}

export function make_rule(rule: Rule): Rule {
    if (rule[":manipulators"]) {
        rule.manipulators = (rule.manipulators || []).concat(
            rule[":manipulators"]
        );
        delete rule[":manipulators"];
    }
    let attrs = Object.keys(rule)
        .filter(key => key.match(/^:/))
        .reduce((base, cur) => {
            base[cur] = rule[cur];
            delete rule[cur];
            return base;
        }, {});
    rule.manipulators = rule.manipulators.map(manip =>
        Object.assign({}, manip, attrs)
    );
    return rule;
}
