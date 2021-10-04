const { readFile } = require("fs/promises");
const { existsSync } = require("fs");
const path = require("path");
const processInput = require("./processInput");
/**
 * Generates a new html file to a 'dist' directory.
 * @param {string} inputPath - A path to a text file
 */
async function processJSON(inputPath) {
  if (!existsSync(inputPath)) {
    console.log("File path does not exist.");
    return process.exit(1);
  }

  if (path.extname(inputPath) === ".json") {
    try {
      const jsonData = await readFile(inputPath, "utf-8");
      const data = JSON.parse(jsonData);
      processInput(data.input, data.stylesheet, data.lang);
    } catch (err) {
      console.log(err);
    }
    return;
  }

  console.log("File extension must be '.json'.");
  return process.exit(1);
}

module.exports = processJSON;
