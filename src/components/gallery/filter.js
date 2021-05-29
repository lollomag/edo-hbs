const wrapper = document.querySelector('.filter-wrapper');
const wrapperGallery = document.querySelector('#lightgallery');

init();

function init() {
  if(!wrapper && !wrapperGallery) return
  addActive();
  initGallery()
}

function initGallery() {
  lightGallery(wrapperGallery, {
    mode: 'lg-fade',
    cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    selector: 'a',
    download: false
  });
}

function addActive() {
  const filters = wrapper.querySelectorAll('.filter-item');
  filters.forEach(filter => {
    filter.addEventListener('click', evt => {
      removeAllActive();
      filter.classList.add('active');
      const data = evt.target.getAttribute('data-filter');
      filterList(data);
    });
  });
}

function removeAllActive() {
  const filters = wrapper.querySelectorAll('.filter-item');
  filters.forEach(filter => {
    filter.classList.remove('active');
  });
}

function filterList(data) {
  const gridItems = document.querySelectorAll('.gallery-item-grid');

  gridItems.forEach(item => {
    const itemFilter = item.getAttribute('data-filter');
    item.removeAttribute('style');
    if(data == 'all') return
    if (itemFilter !== data) {
      item.style.display = 'none';
    }
  });
}
