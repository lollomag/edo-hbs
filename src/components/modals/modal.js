export default class Modals {
  load() {
    this.init();
  }
  init() {
    $('#modal-video').on('show.bs.modal', function (e) {
      const videoSets = JSON.parse(localStorage.getItem('videos'));
      const id = e.relatedTarget.getAttribute('data-id');
      const video = videoSets.find(el => el.id == id);

      const wrapper = document.querySelector('.modal-video .modal-body');
        wrapper.insertAdjacentHTML('afterbegin', `
        <h5 class="title">${video.title}</h5>
        <p class="description">${video.description}</p>
        <video class="mt-50" src="http://localhost:1337${video.cover.url}" controls controlsList="nodownload"></video>
          `)
    })

    $('#modal-video').on('hidden.bs.modal', function (e) {
      // video.pause();
      const wrapper = document.querySelector('.modal-video .modal-body');
      wrapper.innerHTML = "";
    })
  }
}