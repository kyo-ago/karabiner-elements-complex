import * as SourceMapSupport from "source-map-support";
import { read_complex_modifications } from "./read_complex_modifications";
import { read_rules } from "./read_rules";
import { write_rules } from "./write_rules";

SourceMapSupport.install();

let files = read_complex_modifications(
    ~process.argv.indexOf("--json")
        ? process.argv[process.argv.indexOf("--json") + 1]
        : __dirname
);
if (!files.length) {
    console.error("missing setting json files");
    process.exit(1);
}

let rules = read_rules(files);

if (~process.argv.indexOf("--update")) {
    write_rules(rules);
} else {
    console.log({
        title: "private settings",
        rules: rules,
    });
}
