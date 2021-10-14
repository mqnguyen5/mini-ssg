const { existsSync, statSync } = require("fs");
const { readdir, mkdir, rm } = require("fs/promises");
const path = require("path");

const generateHTMLFile = require("./generate-html");

/**
 * Processes user's specified input and determine whether it's a directory, text file or non-text file.
 * Generates HTML file(s) based on the given result. (See {@link generateHTMLFile})
 *
 * @param {string} inputPath - A path to a file/directory
 * @param {string} stylesheetURL - URL link to a CSS stylesheet
 * @param {string} HTMLlanguage - Language used when generating HTML
 */
async function processInput(inputPath, stylesheetURL, HTMLlanguage) {
  if (!existsSync(inputPath)) {
    console.log("File/folder path does not exist.");
    return process.exit(1);
  }

  await manageDist();

  if (statSync(inputPath).isDirectory()) {
    try {
      const entries = await readdir(inputPath);

      // Filters out any non-text and non-markdown files
      const textFiles = entries.filter((entry) => {
        return (
          statSync(path.join(inputPath, entry)).isFile() &&
          (path.extname(entry) === ".txt" || path.extname(entry) === ".md")
        );
      });
      textFiles.forEach((file) => {
        generateHTMLFile(
          path.join(inputPath, file),
          stylesheetURL,
          HTMLlanguage
        );
      });
      return;
    } catch (err) {
      console.log(err);
    }
  }

  if (path.extname(inputPath) !== ".txt" && path.extname(inputPath) !== ".md") {
    console.log("File extension must be '.txt' or '.md'.");
    return process.exit(1);
  }

  generateHTMLFile(inputPath, stylesheetURL, HTMLlanguage);
  return;
}

/**
 * Recursively deletes the existing 'dist' directory and creates a new one.
 */
async function manageDist() {
  const distPath = path.join(__dirname, "../../", "dist");

  try {
    await rm(distPath, {
      recursive: true,
      force: true,
    });
  } catch (err) {
    // Error is ignored since we are about to create 'dist' anyway.
  }

  try {
    await mkdir(distPath);
  } catch (err) {
    console.log("Error creating 'dist' folder.");
    return process.exit(1);
  }
}

module.exports = processInput;
