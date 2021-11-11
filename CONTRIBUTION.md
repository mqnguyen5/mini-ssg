## Overview:

MINI uses [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to keep its code consistently formatted.

Please following the instruction carefully before making a pull request!

## Prerequisites 🧱:

- [Node.js](https://nodejs.org/en/) (minimum v14).

## Installation 💾:

1. Fork this repo from [GitHub](https://github.com/mqnguyen5/mini-ssg) and clone it to your local machine:

```bash
git clone https://github.com/<username>/mini-ssg.git
```

2. Redirect to the project folder:

```bash
cd mini-ssg/
```

3. Install MINI:

```bash
npm install
```

## Development 🧪:

### Prettier:

- `npm run prettier-check` runs a check against the format style guide found in **prettierrc.json**.
- `npm run prettier` runs the same check and adds `--write` option to attempt to fix the style issues.

### ESLint:

- `npm run lint [file] | [dir]` or `npm run eslint [file] | [dir]]` will run all files against the linting style guide found in **.eslintrc**.
- `npm run eslint-fix [file] | [dir]` will do the same as above and also "fixes" any errors.

### Testing ⚗️:

- `npm test [file]` will run the test on the specified file.
- `npm run test:watch [file]` will also run the test but in **watch** mode, which automatically re-runs when changes are made.
