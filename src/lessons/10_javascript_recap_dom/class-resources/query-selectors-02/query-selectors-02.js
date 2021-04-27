function changeImage() {
  const imgElement = document.querySelector('#catImage');

  if (imgElement.attributes.src.value === 'images/cat1.jpg') {
    imgElement.attributes.src.value = 'images/cat2.jpg';
  } else if (imgElement.attributes.src.value === 'images/cat2.jpg') {
    imgElement.attributes.src.value = 'images/cat3.jpg';
  } else {
    imgElement.attributes.src.value = 'images/cat1.jpg';
  }
}
