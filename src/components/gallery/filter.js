const wrapper = document.querySelector('.filter-wrapper.photo');
const wrapperGallery = document.querySelector('#lightgallery');

init();

function init() {
  if (!wrapper && !wrapperGallery) return

  fetch('https://be-edo.herokuapp.com/photos')
    .then(response => response.json())
    .then(data => {
      createFilterElement(data);
      createGallery(data);
      filterList('photos', data);
    });
}

function createFilterElement(photoList) {
  fetch('https://be-edo.herokuapp.com/filter-photos')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        wrapper.insertAdjacentHTML('beforeend', `
      <div class="filter-item" data-filter="${item.filterName}">${item.filterName}</div>
      `)
      });
      addActive(photoList);
    });
}

function createGallery(list) {
  list.forEach(item => {
    if (!item) return;

    if (item.image) {
      wrapperGallery.insertAdjacentHTML('afterbegin', `
        <div class="col-12 col-sm-6 col-md-4 col-xl-3 mt-30 gallery-item-grid" data-filter="${item.filter_photo.filterName}">
          <a href="${item.image.url}" class="gallery-item">
            <img src="${item.image.url}" alt="this link open the gallery" />
          </a>
        </div>
    `)
    }

  });
  
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

function addActive(initialList) {
  const filters = wrapper.querySelectorAll('.filter-item');
  filters.forEach(filter => {
    if (filter.getAttribute('data-filter') === 'photos') {
      filter.classList.add('active');
    }
    filter.addEventListener('click', evt => {
      removeAllActive();
      filter.classList.add('active');
      const data = evt.target.getAttribute('data-filter');
      filterList(data, initialList);
    });
  });
}

function removeAllActive() {
  const filters = wrapper.querySelectorAll('.filter-item');
  filters.forEach(filter => {
    filter.classList.remove('active');
  });
}

function filterList(data, initialList) {
  wrapperGallery.innerHTML = "";
  const newList = initialList.filter(el => el.filter_photo.filterName == data);
    
  createGallery(newList);

  window.lgData[wrapperGallery.getAttribute('lg-uid')].destroy(true);
  initGallery();
}
