const code = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "Enter"
];

let pointer = 0;

document.addEventListener("keydown", (event) => {
  console.log(event);
  
  const expected = code[pointer];
  
  if (event.key === expected) {
    pointer++;
  } else {
    pointer = 0;
  }
  
  if (pointer === code.length) {
    const myParagraph = document.createElement('p');
    
    myParagraph.textContent = "Password to the secret area entered correctly!";
    
    document.body.appendChild(myParagraph);
  }
  
  console.log(pointer);
});