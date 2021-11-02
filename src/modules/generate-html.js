const { readFile, writeFile } = require('fs/promises');
const path = require('path');
const createHtml = require('create-html');
const md = require('markdown-it')().disable(['link', 'image']);

/**
 * Creates a new HTML file, write the appropriate content, then place it to a 'dist/' directory.
 * @param {string} inputPath - A path to a text file
 * @param {string} stylesheetURL - A URL to a CSS stylesheet
 * @param {string} HTMLlanguage - Language used when generating HTML
 */
async function generateHTMLFile(inputPath, stylesheetURL, HTMLlanguage) {
  try {
    const fileName = path.parse(inputPath).name;
    const fileExt = path.extname(inputPath);
    const data = await readFile(inputPath, 'utf-8');

    // Retrieves HTML title (if any) - title is identified by being the first line of text followed by 2 blank lines.
    const htmlTitle = data.match(/^.+(\r?\n\r?\n\r?\n)/);
    const htmlBody = generateHTMLBody(data, fileExt, htmlTitle);

    const html = createHtml({
      lang: HTMLlanguage != null ? HTMLlanguage : 'en-CA',
      head: `<meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
      title: htmlTitle ? htmlTitle[0].trim() : fileName,
      css:
        stylesheetURL != null
          ? stylesheetURL
          : 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
      body: htmlBody,
    });

    await writeFile(path.join('dist', `${fileName}.html`), html);
    console.log(`${fileName}.html has been created.`);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Generates the HTML body using the '.txt' and '.md' file's content.
 * @param {String} data
 * @param {String} extName
 * @param {String} title
 * @returns an HTML body
 */
function generateHTMLBody(data, extName, title) {
  if (extName === '.txt') {
    // Handles ".txt" content
    // If there is an HTML title, wraps the title's content inside an <h1> tag.
    return title == null
      ? data
          .split(/\r?\n\r?\n/g)
          .map((para) => {
            return `<p>${para.replace(/\r?\n/, ' ')}</p>\n\n`;
          })
          .join('\n')
      : `<h1>${title[0].trim()}</h1>\n\n`.concat(
          data
            .substring(title[0].length)
            .split(/\r?\n\r?\n/g)
            .map((para) => {
              return `<p>${para.replace(/\r?\n/, ' ')}</p>\n\n`;
            })
            .join('\n')
        );
  }

  // Handles ".md" content
  return md
    .render(data)
    .replace(/(?<!!)\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>") // replaces link -> <a href="URL">content</a>
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='../assets/$2' />");
}

module.exports = generateHTMLFile;
