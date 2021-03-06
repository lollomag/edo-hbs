const carousel = document.querySelector('.bio-carousel');
const wrapperVideo = document.querySelector('.home-video');

if (wrapperVideo && carousel) {
  fetch('https://be-edo.herokuapp.com/home-page')
    .then(response => response.json())
    .then(data => {
      wrapperVideo.insertAdjacentHTML('afterbegin', `
        <div id="player" data-plyr-provider="vimeo" data-plyr-embed-id="${data.vimeoId}"></div>
      `)
      
      data.photos.forEach(element => {
        carousel.insertAdjacentHTML('afterbegin', `
        <div>
          <img src="${element.url}" alt="">
        </div>
        `)
      });
      const player = new Plyr('#player');
      $(carousel).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
      })

      const cvWrapper = document.querySelector('.download-btn');
      cvWrapper.setAttribute('href', data.curriculum.url);
    });
}