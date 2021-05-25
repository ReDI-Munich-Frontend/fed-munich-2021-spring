function initEventObjectSlide() {
  const slide = document.querySelector('#event-object-slide');
  const paragraph = slide.querySelector('#event-object-slide-paragraph');
  let slideActive = true;

  deck.on('slidechanged', event => {
    slideActive = event.currentSlide === slide;
  });

  slide.querySelector('#event-object-slide-input').addEventListener('keydown', (event) => {
    paragraph.textContent = "Caught keydown event with key " + event.key;
  });
}

deck.on('ready', () => {
  initEventObjectSlide();
});
