function init() {
  return new Promise((resolve) => { resolve(); });
}

function doAfter(time, fn) {
  return () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, time);
  });
}

const container = document.querySelector('#slideshow-content');

init()
.then(doAfter(1000, () => {
  container.textContent = 'slide 1';
}))
.then(doAfter(1000, () => {
  container.textContent = 'slide 2';
}))
.then(doAfter(1000, () => {
  container.textContent = 'slide 3';
}))
.then(doAfter(1000, () => {
  container.textContent = 'slide 4';
}));
