function initScriptTagExampleSlide() {
  const slide = document.querySelector('#script-tag-example-slide');
  const runButton = slide.querySelector('button.run-button');
  const exampleFrame = frames['script-tag-example'];
  const previewWindow = slide.querySelector('preview-window');

  runButton.addEventListener('click', () => {
    runButton.disabled = true;
    previewWindow.classList.add('running');
    setTimeout(() => {
      exampleFrame.window.simulatePageLoad();
    }, 400);
  });

  // resetting everything when leaving the slide
  deck.on('slidechanged', event => {
    if (event.currentSlide === slide || event.previousSlide === slide) {
      runButton.disabled = false;
      previewWindow.classList.remove('running');
    }
  });
}

deck.on('ready', () => {
  initScriptTagExampleSlide();
});
