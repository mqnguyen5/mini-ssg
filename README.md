# MINI

MINI is a simple CLI for generating HTML page(s) from text file(s).

## Features:

-   Automatically parse title from input. (A title is defined by being the first line followed by 2 blank lines)
-   All generated HTML files will be placed into a `./dist` folder
-   All generated HTML files comes with [Water.css](https://github.com/kognise/water.css) by default.
-   Users can specify a URL to a CSS stylesheet.

## Installation:

1. Clone this project from GitHub.
2. Install [Nodejs](https://nodejs.org/en/) on your machine.
3. Redirect to the project folder.
4. Install MINI using `npm install`.

## Usage:

```
node mini-ssg.js -i ./someFolder/file.txt
node mini-ssg.js -i ./someFolder
node mini-ssg.js -i ./file.txt -s ./stylesheetURL
```

You can give MINI a try and see how it works using the included `Sherlock-Holmes-Selected-Stories` directory.

## Options:

| Options            | Functions                                 |
| ------------------ | ----------------------------------------- |
| -v or --version    | Prints the current version                |
| -h or --help       | Prints a list of options to the screen    |
| -i or --input [required]      | Accepts a path to either a file or folder |
| -s or --stylesheet | Accepts a URL to a CSS stylesheet         |

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
            I am afraid, Watson, that I shall have to go,” said Holmes, as we
            sat down together to our breakfast one morning.
        </p>
        <p>“Go! Where to?”</p>
        <p>“To Dartmoor; to King’s Pyland.”</p>
    </body>
</html>
```

## License:

[MIT](https://choosealicense.com/licenses/mit/)
