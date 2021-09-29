const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const createHtml = require("create-html");
let htmlBody = "";

/**
 * Generates a new html file to a 'dist' directory.
 * @param {string} inputPath - A path to a text file
 * @param {string} stylesheetURL - A URL to a CSS stylesheet
 * @param {string} HTMLlanguage - Language used when generating HTML
 */
async function generateHTMLFile(inputPath, stylesheetURL, HTMLlanguage) {
    try {
        const filename = path.parse(inputPath).name;
        const data = await readFile(inputPath, "utf-8");

        // Retrieves HTML title (if any) - title is identified by being the first line of text followed by 2 blank lines.
        const htmlTitle = data.match(/^.+(\r?\n\r?\n\r?\n)/);
        // If there is an HTML title, wraps the title's content inside an <h1> tag.

        if (path.extname(inputPath) === ".txt") {
            // handles ".txt" content
            htmlBody =
                htmlTitle == null
                    ? data
                          .split(/\r?\n\r?\n/)
                          .map((para) => {
                              return `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`;
                          })
                          .join(" ")
                    : `<h1>${htmlTitle[0].trim()}</h1>\n\n`.concat(
                          data
                              .substring(htmlTitle[0].length)
                              .split(/\r?\n\r?\n/)
                              .map((para) => {
                                  return `<p>${para.replace(
                                      /\r?\n/,
                                      " "
                                  )}</p>\n\n`;
                              })
                              .join(" ")
                      );
        } else {
            // handles ".md" content
            htmlBody = data
                .replace(/(?<!!)\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>") // replaces link -> <a href="URL">content</a>
                .replace(/`(.*?)`/gim, "<code>$1</code>") // replaces single backtick-enclosed text -> <code>content</code>
                .split(/\r?\n\r?\n/)
                .map(function (para) {
                    if (para.match(/(?<!#)#{1}\s/) != null) {
                        return `<h1>${para.replace(/# /, "")}</h1>\n\n`; // replaces # -> <h1></h1>
                    } else if (para.match(/(?<!#)#{2}\s/) != null) {
                        return `<h2>${para.replace(/## /, "")}</h2>\n\n`; // replace ## -> <h2></h2>
                    }
                    return `<p>${para.replace(/\r?\n/, " ")}</p>\n\n`;
                })
                .join(" ");
        }

        const html = createHtml({
            lang: HTMLlanguage != null ? HTMLlanguage : "en-CA",
            head: `<meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
            title: htmlTitle ? htmlTitle[0].trim() : filename,
            css:
                stylesheetURL != null
                    ? stylesheetURL
                    : "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
            body: htmlBody,
        });

        await writeFile(
            path.join(__dirname, "../", "dist", `${filename}.html`),
            html
        );
        console.log(`${filename}.html has been created.`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = generateHTMLFile;
