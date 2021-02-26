import './button-example.scss';

const myButton = document.querySelector('#theButton');
const myInput = document.querySelector('#theText');

myButton.addEventListener('click', () => {
  alert('Hello ' + myInput.value);
});