const { readFile } = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');
const processInputs = require('./process-input');
/**
 * Processes user's specified JSON config file and extracts the config options
 *
 * @param {string} inputPath - A path to a JSON config file
 */
async function processJson(inputPath) {
  if (!existsSync(inputPath)) {
    throw new Error('Config file does not exist.');
  }

  if (path.extname(inputPath) !== '.json') {
    throw new Error("File extension must be '.json'.");
  }
  const jsonData = await readFile(inputPath, 'utf-8');
  const data = JSON.parse(jsonData);
  processInputs(data.input, data.stylesheet, data.lang);
}

module.exports = processJson;
