const colourGrid = document.querySelector('#colourgrid');

for (let i = 0; i < 8**2; i++) {
  const cell = document.createElement('div');
  colourGrid.appendChild(cell);

  cell.style.backgroundColor = 'rgb(255, 0, 0)';

  cell.addEventListener('mouseover', (event) => {
    event.target.style.backgroundColor = randomColour();
  });
}

function randomColour() {
  function random255() {
    return Math.floor(Math.random() * 256);
  }

  return `rgb(${random255()}, ${random255()}, ${random255()})`;
}
