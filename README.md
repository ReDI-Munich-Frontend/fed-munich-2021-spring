# Frontend Development 1 - ReDI Munich - Spring 2021

This is the source repository for the slides of the frontend development course
1.

Add new slides inside the `src/lessons` directory. You can use the template in
`src/lessons/00_template`.  Further documentation about the slide syntax can be
found at [revealjs.com](https://revealjs.com/).

Configuration of Reveal.js happens in `src/slides.js`.

## Local installation

For local installation, you need Node.js.

Clone this repsoitory and install the external dependencies:

```
git clone git@github.com:ReDI-Munich-Frontend/fed-munich-2021-spring.git
cd fed-munich-2021-spring
npm install
```

For working on slides, I recommend the built-in webserver. You can start it with
the command:

```
npm run start
```

Then, the slides will be available at
`https://localhost:8080/your-directory/your-slides-filename.slides.html`.

The build-in webserver will automatically reload whenever you make changes to
your source files.

## Creating new slides

When creating slides for a new lesson, check-out a new branch, copy the
`src/lessons/00_template` directory and change the html file's name so that it
ends with `.slides.html`.  Modify the title and the meta-attributes `date` and
`description` - these fields are later used for generating the README file,
which contains an overview of all lessons. If the built-in webserver was
running, you need to restart it, as webpack isn't capable of detecting new html
files during runtime.

For creating code-examples or sharing any other files that shouldn't be changed
by webpack, you may create a directory `class-resources` next to your slides
file. Any files inside this directory will be copied and can be used e.g. in
iframes.

Example directory structure:

```
+ src
  + lessons
    + 01_my_lesson
      | my-lesson.slides.html        Your reveal.js slides file
      | image.png                    An image you may use inside your slides
      + class-resources
        | code-example-1.html
        | code-example-2.js
    + 02_another_lesson
      | another-lesson.slides.html
      ...
```

## Presenting

While presenting, press <kbd>S</kbd> to show the speaker notes. If your browser
blocks the speaker note pop-up, you may have to press S again once it's open.

## Deployment on Github Pages

A workflow exists to automatically build and deploy the slides into the
`gh-pages` branch of this repository.

When setting up Github-Pages, you must use `gh-pages` as source-branch and the
`/docs` directory as source directory.

A separate README file is generated automatically, which contains links to and
meta-information of the slides. It is committed as `README.md` and
`docs/index.md` of the `gh-pages` branch, meaning that it's the home page of
the Github-Pages URL.