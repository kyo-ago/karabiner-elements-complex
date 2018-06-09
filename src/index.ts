import * as SourceMapSupport from "source-map-support";
import { read_complex_modifications } from "./read_complex_modifications";
import { read_rules } from "./read_rules";
import { write_rules } from "./write_rules";

SourceMapSupport.install();

let files = read_complex_modifications(__dirname);
let rules = read_rules(files);
write_rules(rules);
