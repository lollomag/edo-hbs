export default class Modals {
  load() {
    this.init();
  }
  init() {
    $('#modal-video').on('show.bs.modal', function (e) {
      const id = e.relatedTarget.getAttribute('data-id');
      fetch('http://localhost:1337/videos/' + id)
      .then(res => res.json())
      .then(data => {
        const wrapper = document.querySelector('.modal-video .modal-body');
        wrapper.insertAdjacentHTML('afterbegin', `
        <h5 class="title">${data.title}</h5>
        <p class="description">${data.description}</p>
        <video class="mt-50" src="http://localhost:1337${data.cover.url}" controls controlsList="nodownload"></video>
          `)
      })
    })

    // const video = document.querySelector('.modal-video video');
    $('#modal-video').on('hidden.bs.modal', function (e) {
      // video.pause();
      const wrapper = document.querySelector('.modal-video .modal-body');
      wrapper.innerHTML = "";
    })
  }
}