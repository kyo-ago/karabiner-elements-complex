import * as fs from "fs";
import * as path from "path";
import { read_rules } from "./read_rules";
import * as assert from "assert";

describe("Snapshot testing", () => {
    let targetDir = `./samples/`;
    fs.readdirSync(targetDir)
        .filter(fileName => fileName.match(/\.json$/))
        .filter(fileName => !fileName.match(/\.result\.json$/))
        .map(fileName => {
            it(`Test ${fileName}`, function() {
                let actual = read_rules([
                    {
                        textContent: fs.readFileSync(
                            path.join(targetDir, fileName),
                            "utf-8"
                        ),
                        fileName: fileName,
                    },
                ]);
                // Update snapshot with UPDATE_SNAPSHOT=1 npm test
                let expectedFilePath = path.join(
                    targetDir,
                    fileName.replace(/.json$/, ".result.json")
                );
                if (process.env.UPDATE_SNAPSHOT) {
                    fs.writeFileSync(
                        expectedFilePath,
                        JSON.stringify(actual, null, 4)
                    );
                    this.skip();
                    return;
                }
                let expected = JSON.parse(
                    fs.readFileSync(expectedFilePath, "utf-8")
                );
                assert.deepStrictEqual(actual, expected);
            });
        });
});
