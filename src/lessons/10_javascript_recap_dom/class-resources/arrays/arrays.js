const externalAnchors = document.querySelectorAll('a[href^="https://"]');

for (let anchor of externalAnchors) {
  anchor.target = "_blank";
}
