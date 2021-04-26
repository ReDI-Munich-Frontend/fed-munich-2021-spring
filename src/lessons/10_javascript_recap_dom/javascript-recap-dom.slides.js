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

function initConditionalsExampleSlide() {
  const slide = document.querySelector('#conditionals-example-slide');
  let slideActive = true;
  const runButton = slide.querySelector('button.run-button');

  deck.on('slidechanged', event => {
    slideActive = event.currentSlide === slide;
  });

  runButton.addEventListener('click', () => {
    if (!slideActive) {
      return;
    }
    runButton.disabled = true;

    const passwordEntry = prompt('What is the password?');

    if (passwordEntry === 'hunter2') {
      alert('You now have access to my super secret area!');
    }

    runButton.disabled = false;
  });
}

function initConditionalsExampleSlide2() {
  const slide = document.querySelector('#conditionals-example-slide-2');
  let slideActive = true;
  const runButton = slide.querySelector('button.run-button');

  deck.on('slidechanged', event => {
    slideActive = event.currentSlide === slide;
  });

  runButton.addEventListener('click', () => {
    if (!slideActive) {
      return;
    }
    runButton.disabled = true;

    const pizzaTopping = prompt('What do you like on your pizza: 🍕');

    if (pizzaTopping !== 'pineapples') {
      alert('Yum! I love pizza with ' + pizzaTopping);
    } else {
      alert('Eeew how could you?');
    }

    runButton.disabled = false;
  });
}

function initConditionalsExampleSlide3() {
  const slide = document.querySelector('#conditionals-example-slide-3');
  let slideActive = true;
  const runButton = slide.querySelector('button.run-button');

  deck.on('slidechanged', event => {
    slideActive = event.currentSlide === slide;
  });

  runButton.addEventListener('click', () => {
    if (!slideActive) {
      return;
    }
    runButton.disabled = true;

    const input = prompt('Ask me about what the names of some coding languages mean');

    if (input === 'html') {
      alert('HTML stands for HyperText Markup Language');
    } else if (input === 'css') {
      alert('CSS stands for Cascading Style Sheets');
    } else if (input === 'javascript') {
      alert('Javascript is just Javascript');
    } else {
      alert('I don\'t know the language ' + input);
    }

    runButton.disabled = false;
  });
}

deck.on('ready', () => {
  initScriptTagExampleSlide();
  initConditionalsExampleSlide();
  initConditionalsExampleSlide2();
  initConditionalsExampleSlide3();
});
