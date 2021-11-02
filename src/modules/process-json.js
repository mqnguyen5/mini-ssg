const { readFile } = require('fs/promises');
const { existsSync } = require('fs');
const path = require('path');
const processInput = require('./process-input');
/**
 * Processes user's specified config JSON file and determine whether it's a valid JSON file
 * Process the input provided inside in config file (See {@link processInput})
 * @param {string} inputPath - A path to a text file
 */
async function processJSON(inputPath) {
  if (!existsSync(inputPath)) {
    console.log('File path does not exist.');
    return process.exit(1);
  }

  if (path.extname(inputPath) !== '.json') {
    console.log("File extension must be '.json'.");
    return process.exit(1);
  }

  try {
    const jsonData = await readFile(inputPath, 'utf-8');
    const data = JSON.parse(jsonData);
    processInput(data.input, data.stylesheet, data.lang);
  } catch (err) {
    console.log(err);
  }
  return;
}

module.exports = processJSON;
