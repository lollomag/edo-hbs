init();

function init() {
  const header = document.querySelector('header');
  const hamburger = header.querySelector('.hamburger-mobile');
  const mobileContent = header.querySelector('.mobile-navigation');

  hamburger.addEventListener('click', () => {
    mobileContent.classList.toggle('show');
  });
}
