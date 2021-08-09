const wrapper = document.querySelector('.main-video-cinema');

if (wrapper) {
  fetch('http://localhost:1337/cinema-main-video')
  .then(response => response.json())
  .then(data => {
    wrapper.insertAdjacentHTML('afterbegin', `
    <div class="row">
      <div class="col-12 col-md-6">
        <div id="player" data-plyr-provider="vimeo" data-plyr-embed-id="${data.vimeoId}"></div>
      </div>
      <div class="col-12 col-md-6">
        <h2 class="title">${data.title}</h2>
      </div>
    </div>
    `)
    const player = new Plyr('#player');
  });
}