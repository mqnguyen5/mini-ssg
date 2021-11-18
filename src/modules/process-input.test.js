const path = require('path');
const { processPath } = require('./process-input');

describe('processPath tests', () => {
  test('should return an array if path points to a directory', async () => {
    const input = path.join(__dirname, '../../samples/Sherlock-Holmes-Selected-Stories/');

    const results = await processPath(input);
    expect(Array.isArray(results)).toBe(true);
  });

  test('should return a string if path points to a file', async () => {
    const input = path.join(__dirname, '../../samples/test.md');

    const results = await processPath(input);
    expect(typeof results).toBe('string');
  });

  test('should throw appropriate error message when receiving non-existing file/directory path', async () => {
    const input = path.join(__dirname, '../../samples/404.test');

    try {
      await processPath(input);
    } catch (err) {
      expect(err).toEqual(new Error('File/directory does not exist.'));
    }
  });

  test("should throw appropriate error message when receiving file not ending with '.md' or '.txt'", async () => {
    const input = path.join(__dirname, '../../samples/file.js');

    try {
      await processPath(input);
    } catch (err) {
      expect(err).toEqual(new Error("File extension must be '.txt' or '.md'."));
    }
  });
});
