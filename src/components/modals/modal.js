export default class Modals {
  load() {
    this.init();
  }
  init() {
    const videoList = [
      {
        id: "0",
        vimeoId: "535609734",
        title: "Il titolo dai",
        description: "la descrizione migliore"
      },
      {
        id: "1",
        vimeoId: "474122376",
        title: "Il titolo dai 2",
        description: "la descrizione migliore 2"
      },
      {
        id: "2",
        vimeoId: "500386215",
        title: "Il titolo dai 3",
        description: "la descrizione migliore 3"
      },
      {
        id: "3",
        vimeoId: "429554240",
        title: "Il titolo dai 4",
        description: "la descrizione migliore 4"
      }
    ];


    $('#modal-video').on('show.bs.modal', function (e) {
      const id = e.relatedTarget.getAttribute('data-id');
      const video = videoList.find(el => el.id == id);

      const wrapper = document.querySelector('.modal-video .modal-body');
        wrapper.insertAdjacentHTML('afterbegin', `
        <h5 class="title">${video.title}</h5>
        <p class="description mb-50">${video.description}</p>
        <div id="player-modal" data-plyr-provider="vimeo" data-plyr-embed-id="${video.vimeoId}"></div>
          `)

      const videoModal = wrapper.querySelector('#player-modal')
      const initializeVideo = new Plyr(videoModal);
    })

    $('#modal-video').on('hidden.bs.modal', function (e) {
      // video.pause();
      const wrapper = document.querySelector('.modal-video .modal-body');
      wrapper.innerHTML = "";
    })
  }
}