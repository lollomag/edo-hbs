
  init();
  function init() {
    const videoList = [
      {
        id: "0",
        vimeoId: "535609734",
        title: "UP & DOWN",
        coda: '<strong>Directed by:</strong> EDOARDO MARCUZZI <br><strong>Written by:</strong>EDOARDO MARCUZZI <br><strong>A.D.: </strong> OMAR BRADOSTI <br><strong>Sound: </strong> DARIO OTIS BIERER <br><strong>D.O.P.:</strong> KOJI AZEVEDO <br><strong>Make up Artist: </strong> GLORIA CULELL MEDICO <br><strong>Original songs by: </strong> MOROTOV <br><strong>Editing by: </strong> EDOARDO MARCUZZI <br><strong>Produced by: </strong> EDOARDO MARCUZZI, CHARIS USTER <br> <strong>Actors:</strong> ARIA LLANò, GEMMA PINA, MANUEL GARCIA RUBIA'
      },
      {
        id: "1",
        vimeoId: "474122376",
        title: "THE NIGHT",
        coda: '<strong>Director:</strong> Edoardo Marcuzzi <br> <strong>A.D.:</strong> Omar Bradosti <br> <strong>Script:</strong> Edoardo Marcuzzi and Charis Uster <br><strong>DOP:</strong> Omar Bradosti <br><strong>Art Direction:</strong> Charis Uster <br><strong>Sound:</strong> Dario Bierer <br><strong>Make Up:</strong> Marta Ferrer <br><strong>Original Music:</strong> Natalia Laguens <br><strong>"Wendy":</strong> Alba Cabrera Bancelles<br><strong>"Jimmy":</strong> Niccolò Ichestre<br><strong>Producer:</strong> Edoardo Marcuzzi'
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
        coda: '<strong>Director:</strong> Edoardo Marcuzzi<br> <strong>Script:</strong> Edoardo Marcuzzi<br> <strong>DOP:</strong> Rebeca Saveedra Gironas<br> <strong>Sound:</strong> Omar Bradosti<br> <strong>Photography Director:</strong> Jan Hernandez Marsol<br> <strong>A.D.:</strong> Anastasia Papapavlou<br> <strong>"Sean":</strong> Niccolò Ichestre<br> <strong>"The Other Man":</strong> Jan Hernandez Marsol<br> <strong>"Voice Interviwer":</strong> Edoardo Marcuzzi'
      }
    ];

    console.log(videoList);
    


    $('#modal-video').on('show.bs.modal', function (e) {
      const id = e.relatedTarget.getAttribute('data-id');
      const video = videoList.find(el => el.id == id);

      const wrapper = document.querySelector('.modal-video .modal-body');
      if(video.coda){
        wrapper.insertAdjacentHTML('afterbegin', `
        <h3 class="title mb-50">${video.title}</h3>
        <div id="player-modal" data-plyr-provider="vimeo" data-plyr-embed-id="${video.vimeoId}"></div>
        <p class="mt-50">${video.coda}</p>
          `)
      } else {
        wrapper.insertAdjacentHTML('afterbegin', `
        <h3 class="title mb-50">${video.title}</h3>
        <div id="player-modal" data-plyr-provider="vimeo" data-plyr-embed-id="${video.vimeoId}"></div>
          `)
      }

      const videoModal = wrapper.querySelector('#player-modal')
      const initializeVideo = new Plyr(videoModal);
    })

    $('#modal-video').on('hidden.bs.modal', function (e) {
      // video.pause();
      const wrapper = document.querySelector('.modal-video .modal-body');
      wrapper.innerHTML = "";
    })
  }