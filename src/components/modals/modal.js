export default class Modals {
  load() {
    this.init();
  }
  init() {
    const videoList = [
      {
        id: "0",
        vimeoId: "535609734",
        title: "UP & DOWN",
      },
      {
        id: "1",
        vimeoId: "474122376",
        title: "THE NIGHT",
        coda: "Director: Edoardo Marcuzzi, A.D.: Omar Bradosti, Script: Edoardo Marcuzzi and Charis Uster DOP: Omar Bradosti, Art Direction: Charis Uster, Sound: Dario Bierer, Make Up: Marta Ferrer, Original Music: Natalia Laguens, 'Wendy': Alba Cabrera Bancelles, 'Jimmy': Niccolò Ichestre, Producer: Edoardo Marcuzzi"
      },
      {
        id: "2",
        vimeoId: "500386215",
        title: "Apocalypse Days",
      },
      {
        id: "3",
        vimeoId: "429554240",
        title: "Reality Sean",
      }
    ];


    $('#modal-video').on('show.bs.modal', function (e) {
      const id = e.relatedTarget.getAttribute('data-id');
      const video = videoList.find(el => el.id == id);

      const wrapper = document.querySelector('.modal-video .modal-body');
      wrapper.insertAdjacentHTML('afterbegin', `
        <h3 class="title mb-50">${video.title}</h3>
        <div id="player-modal" data-plyr-provider="vimeo" data-plyr-embed-id="${video.vimeoId}"></div>
        <p class="mt-50">${video.coda}</p>
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