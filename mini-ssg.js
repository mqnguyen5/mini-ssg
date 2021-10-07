const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const tool = require("./package.json");
const processInput = require("./utils/processInput");

/**
 * Creates CLI with the following options:
 * -i or --input: specifies a path to a file/directory
 * -h or --help: displays the tool's instructions, cmd line flags and arguments
 * -v or --version: displays the tool's current version
 * -s or --stylesheet: specfies a URL to a CSS stylesheet
 * -l or --language: specifies the language used by the generated HTMLs
 */
const argv = yargs(hideBin(process.argv))
    .help("h")
    .alias("h", "help")
    .version(`${tool.name} v${tool.version}`)
    .alias("v", "version")
    .options({
        i: {
            alias: "input",
            demandOption: true,
            desc: "Path to file/folder",
            type: "array",
        },
        s: {
            alias: "stylesheet",
            desc: "Stylesheet URL",
            type: "string",
        },
        l: {
            alias: "language",
            desc: "Language used when generating HTML",
            type: "string",
        },
    }).argv;

processInput(argv.input.join(" "), argv.stylesheet, argv.language);
