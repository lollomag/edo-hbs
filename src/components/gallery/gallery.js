export default class Gallery {
  load() {
    this.getPhoto();
  }
  getPhoto() {
    const wrapper = document.querySelector('#lightgallery');
    if(wrapper) {
      lightGallery(wrapper, {
        mode: 'lg-fade',
        cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        selector: 'a',
        download: false
      });
    }
  }
}