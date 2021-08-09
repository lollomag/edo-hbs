const wrapper = document.querySelector('.bio-home');
const imagesWrapper = document.querySelector('.other-image');

if (wrapper) {
  fetch('http://localhost:1337/about')
    .then(response => response.json())
    .then(data => {
      wrapper.insertAdjacentHTML('afterbegin', data.biography)
      
      data.photos.forEach(element => {
        imagesWrapper.insertAdjacentHTML('afterbegin', `<img src="http://localhost:1337${element.url}" alt="">`)
      });
    });
}