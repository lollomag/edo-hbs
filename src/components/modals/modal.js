export default class Modals {
  load() {
    this.init();
  }
  init() {
    const video = document.querySelector('.modal-video video');
    $('#modal-video').on('hidden.bs.modal', function (e) {
      video.pause();
    })
  }
}