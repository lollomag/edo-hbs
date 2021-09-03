const wrapper = document.querySelector('.bio-home');
const imagesWrapper = document.querySelector('.other-image');

if (wrapper) {
  fetch('https://be-edo.herokuapp.com/about')
    .then(response => response.json())
    .then(data => {
      wrapper.insertAdjacentHTML('afterbegin', data.biography)
      
      data.photos.forEach(element => {
        imagesWrapper.insertAdjacentHTML('afterbegin', `<img src="${element.url}" alt="">`)
      });
    });
}