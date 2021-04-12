export default class Video {
  load() {
    this.getPhoto();
  }
  getPhoto() {
    const mainVideo = document.querySelector('.main-video');
    if (mainVideo) {
      fetch('http://localhost:1337/videos')
        .then(res => res.json())
        .then(data => {
          this.createGallery(data)
        })
    }
  }

  createGallery(data) {
    const mainVideo = document.querySelector('.main-video');
    const modalVideo = document.querySelector('#modal-videos');

    data.forEach((el, index) => {
      if (index == 0) {
        mainVideo.insertAdjacentHTML('afterbegin', `
          <div class="row">
            <div class="col-12 col-md-6">
              <video class="video-item" src="http://localhost:1337${el.cover.url}" type="video/mp4" controls poster="https://picsum.photos/1000/600"></video>
            </div>
            <div class="col-12 col-md-6">
              <h2 class="title">${el.title}</h2>
              <p class="description">${el.description}</p>
            </div>
          </div>
          `)
      } else {
        modalVideo.insertAdjacentHTML('afterbegin', `
          <div class="col-12 col-md-4 mt-30">
					<div class="simple-video">
						<a data-toggle="modal" data-target="#modal-video" data-id="${el.id}" class="preview">
							<img src="https://picsum.photos/1000/600" alt="">
							<span class="icon material-icons-outlined">play_circle_outline</span>
						</a>
						<h2 class="title">${el.title}</h2>
					</div>
				</div>
          `)
      }
    });
  }
}