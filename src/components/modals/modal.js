
init();
function init() {
  // const videoList = [
  //   {
  //     id: "0",
  //     vimeoId: "582146546",
  //     title: "Artemisia"
  //   },
  //   {
  //     id: "1",
  //     vimeoId: "535609734",
  //     title: "UP & DOWN",
  //     coda: '<strong>Directed by:</strong> EDOARDO MARCUZZI <br><strong>Written by:</strong>EDOARDO MARCUZZI <br><strong>A.D.: </strong> OMAR BRADOSTI <br><strong>Sound: </strong> DARIO OTIS BIERER <br><strong>D.O.P.:</strong> KOJI AZEVEDO <br><strong>Make up Artist: </strong> GLORIA CULELL MEDICO <br><strong>Original songs by: </strong> MOROTOV <br><strong>Editing by: </strong> EDOARDO MARCUZZI <br><strong>Produced by: </strong> EDOARDO MARCUZZI, CHARIS USTER <br> <strong>Actors:</strong> ARIA LLANò, GEMMA PINA, MANUEL GARCIA RUBIA'
  //   },
  //   {
  //     id: "2",
  //     vimeoId: "474122376",
  //     title: "THE NIGHT",
  //     coda: '<strong>Director:</strong> Edoardo Marcuzzi <br> <strong>A.D.:</strong> Omar Bradosti <br> <strong>Script:</strong> Edoardo Marcuzzi and Charis Uster <br><strong>DOP:</strong> Omar Bradosti <br><strong>Art Direction:</strong> Charis Uster <br><strong>Sound:</strong> Dario Bierer <br><strong>Make Up:</strong> Marta Ferrer <br><strong>Original Music:</strong> Natalia Laguens <br><strong>"Wendy":</strong> Alba Cabrera Bancelles<br><strong>"Jimmy":</strong> Niccolò Ichestre<br><strong>Producer:</strong> Edoardo Marcuzzi'
  //   },
  //   {
  //     id: "3",
  //     vimeoId: "500386215",
  //     title: "Apocalypse Days",
  //   },
  //   {
  //     id: "4",
  //     vimeoId: "429554240",
  //     title: "Reality Sean",
  //     coda: '<strong>Director:</strong> Edoardo Marcuzzi<br> <strong>Script:</strong> Edoardo Marcuzzi<br> <strong>DOP:</strong> Rebeca Saveedra Gironas<br> <strong>Sound:</strong> Omar Bradosti<br> <strong>Photography Director:</strong> Jan Hernandez Marsol<br> <strong>A.D.:</strong> Anastasia Papapavlou<br> <strong>"Sean":</strong> Niccolò Ichestre<br> <strong>"The Other Man":</strong> Jan Hernandez Marsol<br> <strong>"Voice Interviwer":</strong> Edoardo Marcuzzi'
  //   },
  //   {
  //     id: "5",
  //     youTube: true,
  //     title: "Wild Farm Cürnigia - crowdfunding campaign",
  //     src: "https://www.youtube.com/embed/GTOAccohMoI"
  //   },
  //   {
  //     id: "6",
  //     youTube: true,
  //     title: "Libri tra i Sassi. I best seller di Matera e della Basilicata",
  //     src: "https://www.youtube.com/embed/Ht-9rdT-TaU"
  //   }
  // ];

  $('#modal-video').on('show.bs.modal', function (e) {
    const id = e.relatedTarget.getAttribute('data-id');

    fetch('http://localhost:1337/cinema-videos/' + id)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const wrapper = document.querySelector('.modal-video .modal-body');
        if (data.testvimeoyt[0].link) {
          if (data.credits) {
          wrapper.insertAdjacentHTML('afterbegin', `
          <h3 class="title mb-50">${data.title}</h3>
          <iframe width="560" height="315" src="${data.testvimeoyt[0].link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <p class="mt-50">${data.credits}</p>
            `)
          } else {
            wrapper.insertAdjacentHTML('afterbegin', `
          <h3 class="title mb-50">${data.title}</h3>
          <iframe width="560" height="315" src="${data.testvimeoyt[0].link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `)
          }
        } else {
          if (data.credits) {
            wrapper.insertAdjacentHTML('afterbegin', `
          <h3 class="title mb-50">${data.title}</h3>
          <div class="vimeo-video">
            <iframe src="https://player.vimeo.com/video/${data.testvimeoyt[0].vimeoId}?color=ffffff&byline=0&portrait=0" frameborder="0" fullscreen; picture-in-picture" allowfullscreen></iframe>
          </div>
          
          <p class="mt-50">${data.credits}</p>
            `)
          } else {
            wrapper.insertAdjacentHTML('afterbegin', `
          <h3 class="title mb-50">${data.title}</h3>
          <div class="vimeo-video">
            <iframe src="https://player.vimeo.com/video/${data.testvimeoyt[0].vimeoId}?color=ffffff&byline=0&portrait=0" frameborder="0" fullscreen; picture-in-picture" allowfullscreen></iframe>
          </div>
            `)
          }
        }

        const videoModal = wrapper.querySelector('#player-modal')
        const initializeVideo = new Plyr(videoModal);
      });
  })

  $('#modal-video').on('hidden.bs.modal', function (e) {
    // video.pause();
    const wrapper = document.querySelector('.modal-video .modal-body');
    wrapper.innerHTML = "";
  })
}