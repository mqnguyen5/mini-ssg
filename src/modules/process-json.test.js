const path = require('path');
const processJson = require('./process-json');

describe('processJson tests', () => {
  test('valid JSON file path should successfully parse all fields', () => {
    const jsonFilePath = path.join(__dirname, '../../', 'samples/sample.json');
    const expectedJsonObject = {
      input: './samples/test.md',
      stylesheet: 'https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css',
      lang: 'fr',
    };

    expect(processJson(jsonFilePath)).toEqual(expectedJsonObject);
  });

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
