const { processFile, generateHtmlBody, createHtmlFile } = require('./generate-html');

describe('generateHtmlBody tests', () => {
  test('returned html body should be of type String', () => {
    const data = 'Hello World!';
    const extName = '.txt';
    const title = null;

    const result = generateHtmlBody(data, extName, title);
    expect(typeof result).toBe('string');
  });

  test('returned html paragraph should be wrapped in <p> tag', () => {
    const data = 'Hello World!';
    const extName = '.txt';
    const title = null;

    const result = generateHtmlBody(data, extName, title);
    expect(result).toMatch(new RegExp(/<p>(.+?)<\/p>/g));
  });

  test('returned html title should be wrapped in <h1> tag', () => {
    const data = 'Hello World!';
    const extName = '.txt';
    const title = 'a title';

    const result = generateHtmlBody(data, extName, title);
    expect(result).toMatch(new RegExp(/<h1>(.+?)<\/h1>\n\n/g));
  });
});
