const carousel = document.querySelector('.bio-carousel');

if(carousel) {
  $(carousel).slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  });
}