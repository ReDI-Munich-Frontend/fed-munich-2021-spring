function initApiExampleSlide() {
  const slide = document.querySelector('#api-example-slide');
  const runButton = slide.querySelector('button.run-button');
  let slideActive = true;

  deck.on('slidechanged', event => {
    slideActive = event.currentSlide === slide;
  });

  runButton.addEventListener('click', () => {
    if (!slideActive) {
      return;
    }

    fetch('https://randomuser.me/api/?nat=us&randomapi')
      .then(response => response.json())
      .then(data => {
        const person = data.results[0];
        alert('Got a random user named ' + person.name.first + ' ' + person.name.last);
      });
  });
}

deck.on('ready', () => {
  initApiExampleSlide();
})

