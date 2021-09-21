# MINI

MINI is a simple CLI for generating HTML page(s) from text and markdown file(s).

## Features:

- Automatically parse title from input. (A title is defined by being the first line followed by 2 blank lines)
- All generated HTML files will be placed into a `./dist` folder
- All generated HTML files comes with [Water.css](https://github.com/kognise/water.css) by default.
- Users can specify a URL to a CSS stylesheet.
- If user's input is a markdown file, it will convert all Heading1, Heading2 and Link into its corresponding HTML tags

## Installation:

1. Clone this project from GitHub.
2. Install [Nodejs](https://nodejs.org/en/) on your machine.
3. Redirect to the project folder.
4. Install MINI using `npm install`.

## Usage:

1. Converting a single text file:

```
node mini-ssg.js -i ./someFolder/file.txt
```

2. Converting a single markdown file:

```
node mini-ssg.js -i ./someFolder/file.md
```

3. Converting a folder/directory with multiple text files:

```
node mini-ssg.js -i ./someFolder
```

4. Converting a single text file with a specified CSS stylesheet:

```
node mini-ssg.js -i ./file.txt -s ./stylesheetURL
```

You can give MINI a try and see how it works using the included `Sherlock-Holmes-Selected-Stories` directory.

## Options:

| Options                  | Functions                                 |
| ------------------------ | ----------------------------------------- |
| -v or --version          | Prints the current version                |
| -h or --help             | Prints a list of options to the screen    |
| -i or --input [required] | Accepts a path to either a file or folder |
| -s or --stylesheet       | Accepts a URL to a CSS stylesheet         |

## Example:

#### file.txt

```
Silver Blaze


I am afraid, Watson, that I shall have to go,” said Holmes, as we
sat down together to our breakfast one morning.

“Go! Where to?”

“To Dartmoor; to King’s Pyland.”
```

will be converted to

#### file.html

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title>Silver Blaze</title>
    <meta charset="utf-8" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
    />
  </head>
  <body>
    <h1>Silver Blaze</h1>
    <p>
      I am afraid, Watson, that I shall have to go,” said Holmes, as we sat down
      together to our breakfast one morning.
    </p>
    <p>“Go! Where to?”</p>
    <p>“To Dartmoor; to King’s Pyland.”</p>
  </body>
</html>
```

#### file.md

```
# MINI

MINI is a simple CLI for generating HTML page(s) from text and markdown file(s).

## Features:

-   Automatically parse title from input. (A title is defined by being the first line followed by 2 blank lines)
-   All generated HTML files will be placed into a `./dist` folder
-   All generated HTML files comes with [Water.css](https://github.com/kognise/water.css) by default.
-   Users can specify a URL to a CSS stylesheet.
```

will be converted to

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <title>file</title>
    <meta charset="utf-8" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
    />
  </head>
  <body>
    <h1>MINI</h1>

    <p>
      MINI is a simple CLI for generating HTML page(s) from text and markdown
      file(s).
    </p>

    <h2>Features:</h2>

    <p>
      - Automatically parse title from input. (A title is defined by being the
      first line followed by 2 blank lines) - All generated HTML files will be
      placed into a `./dist` folder - All generated HTML files comes with
      <a href="https://github.com/kognise/water.css">Water.css</a> by default. -
      Users can specify a URL to a CSS stylesheet.
    </p>

  </body>
</html>
```

## License:

[MIT](https://choosealicense.com/licenses/mit/)
