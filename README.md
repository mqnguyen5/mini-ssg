# MINI

MINI is a simple CLI for generating HTML page(s) from text and markdown file(s).

## Features ✨:

- Automatically parse title from input. (A title is defined by being the first line followed by 2 blank lines)
- All generated HTML files will be placed into a `./dist` folder.
- All generated HTML files comes with [Water.css](https://github.com/kognise/water.css) by default.
- Users can specify a URL to a CSS stylesheet.
- If user's input contains markdown file(s), MINI will convert all `# Heading1`, `## Heading2`, inline code blocks, and `[Link](...)` into their corresponding HTML elements.
- If user specifies a config JSON file, MINI will extract the `input`, `stylesheet` and `lang` properties and ignore other options from the JSON file to generate HTML files accordingly.
- Support static assets: All generated HTML files (from markdown files only) will reference static assets (images or favicon) from the `/assets` folder.

**WARNING**: All static assets in the `/assets` folder will be override when converting new `.md` files!

## Installation 💾:

```bash
npm install -g mini-cli-ssg
```

## Usage 🚗:

1. Converting a single text file:

```
mini-cli-ssg -i ./someFolder/file.txt
```

2. Converting a single markdown file:

```
mini-cli-ssg -i ./someFolder/file.md
```

3. Converting a folder/directory with multiple text/markdown files:

```
mini-cli-ssg -i ./someFolder
```

4. Converting a single text file with a specified CSS stylesheet:

```
mini-cli-ssg -i ./file.txt -s ./stylesheetURL
```

5. Converting a single text file/a directory with a config JSON file:

```
mini-cli-ssg -c ./samples/sample.json
```

You can give MINI a try and see how it works using the included `Sherlock-Holmes-Selected-Stories` directory and/or the `sample.json` file.

## Options 🔧:

| Options            | Functions                                          |
| ------------------ | -------------------------------------------------- |
| -v or --version    | Prints the current version                         |
| -h or --help       | Prints a list of options to the screen             |
| -i or --input      | Accepts a path to either a file or folder          |
| -s or --stylesheet | Accepts a URL to a CSS stylesheet                  |
| -l or --language   | Specifies the language used by the generated HTMLs |
| -c or --config     | Accepts a path to a config JSON file               |

## Example 🔰:

#### file.txt

```
Silver Blaze


I am afraid, Watson, that I shall have to go,” said Holmes, as we
sat down together to our breakfast one morning.

“Go! Where to?”

“To Dartmoor; to King’s Pyland.”
```

will be converted to

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title>Silver Blaze</title>
    <meta charset="utf-8" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
  </head>
  <body>
    <h1>Silver Blaze</h1>
    <p>
      I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down together to our
      breakfast one morning.
    </p>
    <p>“Go! Where to?”</p>
    <p>“To Dartmoor; to King’s Pyland.”</p>
  </body>
</html>
```

#### file.md

```
# MINI

## Features:

-   Automatically parse title from input. (A title is defined by being the first line followed by 2 blank lines)

-   All generated HTML files will be placed into a `./dist` folder.

-   All generated HTML files comes with [Water.css](https://github.com/kognise/water.css) by default.

-   Users can specify a URL to a CSS stylesheet.

-   If user's input contains markdown file(s), MINI will convert all `# Heading1`, `## Heading2`, and `[Link](...)` into their corresponding HTML elements.

```

will be converted to

```html
<!DOCTYPE html>
<html lang="en-CA" dir="ltr">
  <head>
    <title>test</title>
    <meta charset="utf-8" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
  </head>
  <body>
    <h1>MINI</h1>
    <h2>Features:</h2>
    <p>
      - Automatically parse title from input. (A title is defined by being the first line followed
      by 2 blank lines)
    </p>
    <p>
      - All generated HTML files will be placed into a
      <code>./dist</code> folder.
    </p>
    <p>
      - All generated HTML files comes with
      <a href="https://github.com/kognise/water.css">Water.css</a> by default.
    </p>
    <p>- Users can specify a URL to a CSS stylesheet.</p>
    <p>
      - If user's input contains markdown file(s), MINI will convert all
      <code># Heading1</code>, <code>## Heading2</code>, and
      <code><a href="...">Link</a></code> into their corresponding HTML elements.
    </p>
    <p></p>
  </body>
</html>
```

## Contributing 🚧:

I'm still actively developing and maintaining MINI, and if you'd like to help, please have a look at the [contribution docs](https://github.com/mqnguyen5/mini-ssg/blob/main/CONTRIBUTION.md).

All contributions are very much welcome! 🥳

## License 🚨:

[MIT](https://choosealicense.com/licenses/mit/)
