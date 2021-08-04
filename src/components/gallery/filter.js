const wrapper = document.querySelector('.filter-wrapper.photo');
const wrapperGallery = document.querySelector('#lightgallery');

init();

function init() {
  if (!wrapper && !wrapperGallery) return

  fetch('http://localhost:1337/photos')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    createGallery(data);
    addActive(data);
    initGallery()
  });
}

function createGallery(list) {
  list.forEach(item => {
    wrapperGallery.insertAdjacentHTML('afterbegin', `
    <div class="col-12 col-sm-6 col-md-4 col-xl-3 mt-30 gallery-item-grid" data-filter="${item.filter}">
      <a href="http://localhost:1337${item.image.url}" class="gallery-item">
        <img src="http://localhost:1337${item.image.url}" alt="" />
      </a>
    </div>
    `)
  });
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
  if (data == 'all') {
    createGallery(initialList)
  } else {
    const newList = initialList.filter(el => el.filter == data);
    createGallery(newList);
  }

  window.lgData[wrapperGallery.getAttribute('lg-uid')].destroy(true);
  initGallery();
}
