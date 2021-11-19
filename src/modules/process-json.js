const { readFileSync, existsSync } = require('fs');
const path = require('path');

/**
 * Processes user's specified JSON config file and extracts the config options
 *
 * @param {string} inputPath - A path to a JSON config file
 * @returns {Object} configOptions - A JSON config options object
 */
function processJson(inputPath) {
  if (!existsSync(inputPath)) {
    throw new Error('Config file does not exist.');
  }

  if (path.extname(inputPath) !== '.json') {
    throw new Error("File extension must be '.json'.");
  }
  const jsonData = readFileSync(inputPath, 'utf-8');

  return JSON.parse(jsonData);
}

module.exports = processJson;
