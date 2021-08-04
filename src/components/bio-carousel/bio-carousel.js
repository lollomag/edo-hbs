const carousel = document.querySelector('.bio-carousel');

if (carousel) {
  fetch('http://localhost:1337/home-carousels')
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        carousel.insertAdjacentHTML('afterbegin', `
        <div>
          <img src="http://localhost:1337${element.image.url}" alt="">
        </div>
        `)
      });
      $(carousel).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
      })
    });
}