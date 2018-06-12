import * as fs from "fs";

export interface ComplexModificationFile {
    fileName: string;
    textContent: string;
}

export function read_complex_modifications(
    dirname: string
): ComplexModificationFile[] {
    return fs
        .readdirSync(dirname)
        .filter(file => file.match(/\.json$/))
        .map(file => {
            let path = `${dirname}/${file}`;
            return {
                fileName: file,
                textContent: fs.readFileSync(path, "utf-8"),
            };
        });
}
