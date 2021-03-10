const glob = require('glob');
const fs = require('fs');
const jsdom = require('jsdom');

const [repoOwner, repoName] = process.argv[2].split('/');
const targetReadmeFile = './dist/README.md';
const slideLinkBaseUrl = `https://${repoOwner}.github.io/${repoName}/`;

const slideFiles = glob.sync('./dist/docs/**/*.slides.html');

const readmeHeader = `
# ReDI School Munich - Frontend Development - Spring 2021

This repository contains teaching material and assignments for the Frontend Development course of spring 2021 at ReDI school Munich.
`;

const readmeEntry = `
## [%{title}](%{link}) (%{date})
%{classResources}

%{description}
`;

const readmeFooter = ``;

const slides = slideFiles.map(slideFile => {
  const strippedFileName = slideFile.replace(/\.\/dist\/docs\//, '');
  const fileContents = fs.readFileSync(slideFile);
  const dom = new jsdom.JSDOM(fileContents);

  const sourceDirectory = ('./src/' + strippedFileName).replace(/\/[^\/]*$/, '') + '/';
  const classResourcesDirectoryCandidate = sourceDirectory + 'class-resources';
  
  console.log(classResourcesDirectoryCandidate);

  const head = dom.window.document.querySelector('head');

  const title = head.querySelector('title').textContent;
  const dateString = head.querySelector('meta[name=date]').attributes['content'].value;
  const descriptionRaw = head.querySelector('meta[name=description]').attributes['content'].value;

  const date = new Date(dateString);
  const dateLocaleString = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const description = fixIndentation(descriptionRaw);

  return {
    title,
    link: slideLinkBaseUrl + strippedFileName,
    date: new Date(dateString),
    dateLocaleString,
    descriptionRaw,
    description,
    classResources: fs.existsSync(classResourcesDirectoryCandidate)
      ? classResourcesDirectoryCandidate.replace(/^\.\//, '')
      : null
  };
});

slides.sort((a, b) => a.date - b.date);

const slidesReadmeEntries = slides.map(slide => readmeEntry
  .replace('%{title}', slide.title)
  .replace('%{link}', slide.link)
  .replace('%{date}', slide.dateLocaleString)
  .replace('%{description}', slide.description)
  .replace('%{classResources}', slide.classResources
    ? `#### [Class resources](https://github.com/${repoOwner}/${repoName}/tree/master/${slide.classResources})`
    : '')
);

const readmeMd = `${readmeHeader}
${slidesReadmeEntries.join('')}
${readmeFooter}`;

fs.writeFileSync(targetReadmeFile, readmeMd);

function fixIndentation(description) {
  description = description.replace(/^\s*\n/, '');
  description = description.replace(/\n\s*$/, '');

  const leadingSpaces = description.match(/^\s*/mg);
  const indentation = Math.min(...leadingSpaces.map(str => str.length));

  description = description.replace(new RegExp(`^\\s{${indentation}}`, 'mg'), '');

  return description;
}