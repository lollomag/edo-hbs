const wrapper = document.querySelector('.home-video');

if (wrapper) {
  fetch('http://localhost:1337/homepage')
  .then(response => response.json())
  .then(data => {
    wrapper.insertAdjacentHTML('afterbegin', `
    <div id="player" data-plyr-provider="vimeo" data-plyr-embed-id="${data.vimeo}"></div>
    `)
    const player = new Plyr('#player');
  });
}