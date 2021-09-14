const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const createHtml = require("create-html");

/**
 * Generates a new html file to a 'dist' directory.
 * @param {string} inputPath - A path to a text file
 * @param {string} stylesheetURL - A URL to a CSS stylesheet
 */
async function generateHTMLFile(inputPath, stylesheetURL) {
    try {
        const filename = path.parse(inputPath).name;
        const data = await readFile(inputPath, "utf-8");

        // Retrieves HTML title (if any) - title is identified by being the first line of text followed by 2 blank lines.
        const htmlTitle = data.match(/^.+(\r?\n\r?\n\r?\n)/);
        // If there is an HTML title, wraps the title's content inside an <h1> tag.
        const htmlBody =
            htmlTitle == null
                ? data
                      .split(/\r?\n\r?\n/)
                      .map((para) => {
                          return `<p>${para.replace(/\r?\n/, " ")}</p>`;
                      })
                      .join(" ")
                : `<h1>${htmlTitle[0].trim()}</h1> `.concat(
                      data
                          .substring(htmlTitle[0].length)
                          .split(/\r?\n\r?\n/)
                          .map((para) => {
                              return `<p>${para.replace(/\r?\n/, " ")}</p>`;
                          })
                          .join(" ")
                  );

        const html = createHtml({
            lang: "en",
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
