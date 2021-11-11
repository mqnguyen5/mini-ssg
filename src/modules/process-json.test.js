const path = require('path');
const processJson = require('./process-json');

describe('processJson tests', () => {
  test('empty file path should throw error with appropriate message', async () => {
    const filePath = '';
    try {
      await processJson(filePath);
    } catch (err) {
      expect(err).toEqual(new Error('Config file does not exist.'));
    }
  });

  test('non-existing file should throw error with appropriate message', async () => {
    const filePath = path.join(__dirname, '404.json');
    try {
      await processJson(filePath);
    } catch (err) {
      expect(err).toEqual(new Error('Config file does not exist.'));
    }
  });

  test('non-JSON file should throw error with appropriate message', async () => {
    const filePath = path.join(__dirname, '../../samples/test.md');
    try {
      await processJson(filePath);
    } catch (err) {
      expect(err).toEqual(new Error("File extension must be '.json'."));
    }
  });
});
