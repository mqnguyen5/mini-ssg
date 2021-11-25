#!/usr/bin/env node
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const tool = require('../package.json');
const { processInputs } = require('./modules/process-input');
const processJson = require('./modules/process-json');

/**
 * Creates CLI with the following options:
 * -i or --input: specifies a path to a file/directory
 * -h or --help: displays the tool's instructions, cmd line flags and arguments
 * -v or --version: displays the tool's current version
 * -s or --stylesheet: specifies a URL to a CSS stylesheet
 * -l or --language: specifies the language used by the generated HTMLs
 * -c or --config: specifies a path to a JSON file
 */
const argv = yargs(hideBin(process.argv))
  .scriptName('mini-cli-ssg')
  .usage('Usage: $0 -i <path> -s <stylesheet-url>')
  .help('h')
  .alias('h', 'help')
  .version(`${tool.name} v${tool.version}`)
  .alias('v', 'version')
  .options({
    i: {
      alias: 'input',
      desc: 'Path to file/folder',
      type: 'array',
    },
    s: {
      alias: 'stylesheet',
      desc: 'Stylesheet URL',
      type: 'string',
    },
    l: {
      alias: 'language',
      desc: 'Language used when generating HTML',
      type: 'string',
    },
    c: {
      alias: 'config',
      desc: 'Path to a JSON file',
      type: 'array',
    },
  }).argv;

function showError(err) {
  console.log(`${err}\n`);
  yargs.showHelp();

  return process.exit(1);
}

try {
  if (!argv.input && !argv.config) {
    showError('Error! Please specify either -i or -c option.');
  }

  if (argv.config) {
    const data = processJson(argv.config.join(' '));
    processInputs(data.input, data.stylesheet, data.lang);
    return;
  }

  processInputs(argv.input.join(' '), argv.stylesheet, argv.language);
} catch (err) {
  console.log(err);
}
