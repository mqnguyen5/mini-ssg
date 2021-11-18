const { readFile, writeFile } = require('fs').promises;
const path = require('path');

const createHtml = require('create-html');
const md = require('markdown-it')().disable(['link', 'image']);
const prettier = require('prettier');

/**
 * Extracts the file's information and read its data.
 *
 * @param {string} filePath - A path to a file
 * @param {string} stylesheetUrl - A URL to a CSS stylesheet
 * @param {string} language - Language used when generating HTML
 */
async function processFile(filePath, stylesheetUrl, language) {
  try {
    const data = await readFile(filePath, 'utf-8');

    const filename = path.parse(filePath).name;
    const fileExt = path.extname(filePath);

    // Retrieves HTML title (if any) from the file's data - title is identified by being the first line of text followed by 2 blank lines.
    const rawTitle = data.match(/^.+(\r?\n\r?\n\r?\n)/);
    const htmlTitle = rawTitle ? rawTitle[0].trim() : filename;

    const htmlBody = generateHtmlBody(data, fileExt, rawTitle);

    createHtmlFile(filename, language, stylesheetUrl, { title: htmlTitle, body: htmlBody });
    return true;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Generates the HTML body using the file's content.
 *
 * @param {String} data
 * @param {String} extName
 * @param {String} title
 * @returns an HTML body
 */
function generateHtmlBody(data, extName, title) {
  if (extName === '.txt') {
    // Handles ".txt" content
    // If there is an HTML title, wraps the title's content inside an <h1> tag.
    return title == null || title.length === 0
      ? data
          .split(/\r?\n\r?\n/g)
          .map((para) => {
            return `<p>${para.replace(/\r?\n/, ' ')}</p>\n\n`;
          })
          .join(' ')
      : `<h1>${title[0].trim()}</h1>\n\n`.concat(
          data
            .substring(title[0].length)
            .split(/\r?\n\r?\n/g)
            .map((para) => {
              return `<p>${para.replace(/\r?\n/, ' ')}</p>\n\n`;
            })
            .join(' ')
        );
  }

  // Handles ".md" content
  return md
    .render(data)
    .replace(/(?<!!)\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='../assets/$2' />");
}

/**
 * Generates the HTML content, appends it to a new HTML file, and puts the file in a 'dist/' directory.
 *
 * @param {String} filename
 * @param {String} language
 * @param {String} stylesheetUrl
 * @param {object} html
 */
async function createHtmlFile(
  filename,
  language = 'en-CA',
  stylesheetUrl = 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
  html
) {
  try {
    const fileContent = createHtml({
      lang: language,
      head: `<meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
      title: html.title,
      css: stylesheetUrl,
      body: html.body,
    });

    await writeFile(
      path.join('dist', `${filename}.html`),
      prettier.format(fileContent, { parser: 'html' })
    );
    console.log(`${filename}.html has been created.`);
    return true;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { processFile, generateHtmlBody, createHtmlFile };
