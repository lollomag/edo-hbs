const wrapper = document.querySelector('.filter-wrapper.video');
const wrapperGallery = document.querySelector('#modal-videos');

init();

function init() {
  if (!wrapper && !wrapperGallery) return

  fetch('http://localhost:1337/cinema-videos')
  .then(response => response.json())
  .then(data => {
    createGallery(data);
    createFilterElement(data);
  });
}

function createFilterElement(photoList) {
  fetch('http://localhost:1337/filter-videos')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      wrapper.insertAdjacentHTML('beforeend', `
      <div class="filter-item" data-filter="${item.filter_name}">${item.filter_name}</div>
      `)
    });
    addActive(photoList);
  });
}

function createGallery(list) {
  list.forEach((item, index) => {
    if (item.inProduction) {
      wrapperGallery.insertAdjacentHTML('afterbegin', `
    <div class="col-12 col-md-4 mt-30" data-filter="type-${item.filter_video.filter_name}">
      <div class="simple-video">
        <div class="preview">
          <img src="http://localhost:1337${item.cover.url}" alt="">
          <span class="icon material-icons-outlined">movie</span>
        </div>
        <h2 class="title">${item.title}</h2>
      </div>
    </div>
    `)
    } else {
      wrapperGallery.insertAdjacentHTML('afterbegin', `
      <div class="col-12 col-md-4 mt-30" data-filter="type-${item.filter_video.filter_name}">
        <div class="simple-video">
          <a data-toggle="modal" data-target="#modal-video" data-id="${item.id}" class="preview">
            <img src="http://localhost:1337${item.cover.url}" alt="">
            <span class="icon material-icons-outlined">play_circle_outline</span>
          </a>
          <h2 class="title">${item.title}</h2>
        </div>
      </div>
      `)
    }
  });
}

function addActive(list) {
  const filters = wrapper.querySelectorAll('.filter-item');
  filters.forEach(filter => {
    filter.addEventListener('click', evt => {
      removeAllActive();
      filter.classList.add('active');
      const data = evt.target.getAttribute('data-filter');
      filterList(data, list);
    });
  });
}

function removeAllActive() {
  const filters = wrapper.querySelectorAll('.filter-item');
  filters.forEach(filter => {
    filter.classList.remove('active');
  });
}

function filterList(data, list) {
  wrapperGallery.innerHTML = "";
  if (data == 'all') {
    createGallery(list)
  } else {
    const newList = list.filter(el => el.filterType == data);
    createGallery(newList);
  }
}
