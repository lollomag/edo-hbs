export default class Gallery {
  load() {
    this.getPhoto();
  }
  getPhoto() {
    const wrapper = document.querySelector('#lightgallery');
    if(wrapper) {
      fetch('http://localhost:1337/galleries')
      .then(res => res.json())
      .then(data => {
        this.createGallery(data)
      })
      .then(() => {
        lightGallery(wrapper, {
          mode: 'lg-fade',
          cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
          selector: 'a',
          download: false
        });
      })
    }
  }

  createGallery(data) {
    const array = data.slice(0, 10);
    const wrapper = document.querySelector('#lightgallery');
    if (wrapper) {

      array.forEach(el => {
        wrapper.insertAdjacentHTML('afterbegin', `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-30">
          <a href="http://localhost:1337${el.image.url}" class="gallery-item">
            <img src="http://localhost:1337${el.image.url}" alt="test"/>
          </a>
        </div>
        `)
      });
    }
  }
}