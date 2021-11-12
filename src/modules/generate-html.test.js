const { existsSync } = require('fs');
const { mkdir, rm } = require('fs/promises');
const path = require('path');

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

describe('createHtmlFile tests', () => {
  const distPath = path.join(__dirname, '../../', 'dist');
  beforeAll(async () => {
    await mkdir(distPath);
  });

  test('html file should be created successfully and placed in "dist/"', async () => {
    const filename = 'test';
    const language = 'fr';
    const stylesheetUrl = null;
    const html = '<p>This is a paragraph.</p>';

    const expectedFilePath = path.join(distPath, 'test.html');
    await createHtmlFile(filename, language, stylesheetUrl, html);

    const result = existsSync(expectedFilePath);
    expect(result).toBe(true);
  });

  afterAll(async () => {
    await rm(distPath, { recursive: true, force: true });
  });
});
