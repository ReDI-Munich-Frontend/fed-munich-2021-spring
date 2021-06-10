function after(time, fn) {
  return () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, time);
  });
}

const container = document.querySelector('#slideshow-content');

Promise.resolve()
  .then(after(1000, () => {
    container.textContent = 'slide 1';
  }))
  .then(after(1000, () => {
    container.textContent = 'slide 2';
  }))
  .then(after(1000, () => {
    container.textContent = 'slide 3';
  }))
  .then(after(1000, () => {
    container.textContent = 'slide 4';
  }));

/*
 * Without promises:
 *
 * setTimeout(() => {
 *   container.textContent = 'slide1';
 *
 *   setTimeout(() => {
 *     container.textContent = 'slide2';
 *
 *     setTimeout(() => {
 *       container.textContent = 'slide3';
 *
 *       setTimeout(() => {
 *         container.textContent = 'slide 4';
 *       }, 1000);
 *     }, 1000);
 *   }, 1000);
 * }, 1000);
 */
