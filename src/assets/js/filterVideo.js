const wrapper = document.querySelector('.filter-wrapper.video');
const wrapperGallery = document.querySelector('#modal-videos');

init();

function init() {
  if (!wrapper && !wrapperGallery) return

  fetch('https://be-edo.herokuapp.com/cinema-videos')
  .then(response => response.json())
  .then(data => {
    createGallery(data);
    createFilterElement(data);
    filterList('shortMovies', data)
  });
}

function createFilterElement(photoList) {
  fetch('https://be-edo.herokuapp.com/filter-videos')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      wrapper.insertAdjacentHTML('beforeend', `
      <div class="filter-item" data-filter="${removeSpaces(item.filter_name)}">${item.filter_name}</div>
      `)
    });
    addActive(photoList);
  });
}

function createGallery(list) {
  list.forEach((item, index) => {
    
    if (item.inProduction) {
      wrapperGallery.insertAdjacentHTML('afterbegin', `
    <div class="col-12 col-md-4 mt-30" data-filter="${removeSpaces(item.filter_video.filter_name)}">
      <div class="simple-video">
        <div class="preview">
          <img src="${item.cover.url}" alt="">
          <span class="icon material-icons-outlined">movie</span>
        </div>
        <h2 class="title">${item.title}</h2>
      </div>
    </div>
    `)
    } else {
      wrapperGallery.insertAdjacentHTML('afterbegin', `
      <div class="col-12 col-md-4 mt-30" data-filter="${removeSpaces(item.filter_video.filter_name)}">
        <div class="simple-video">
          <a data-toggle="modal" data-target="#modal-video" data-id="${item.id}" class="preview">
            <img src="${item.cover.url}" alt="">
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
    if (filter.getAttribute('data-filter') === 'shortMovies') {
      filter.classList.add('active');
    }
    filter.addEventListener('click', evt => {
      removeAllActive();
      filter.classList.add('active');
      const data = evt.target.getAttribute('data-filter');
      filterList(data, list);
    });
  });
}

function removeSpaces(string) {
  return string.replace(/\s+/g, '')
}

function removeAllActive() {
  const filters = wrapper.querySelectorAll('.filter-item');
  filters.forEach(filter => {
    filter.classList.remove('active');
  });
}

function filterList(data, list) {
  wrapperGallery.innerHTML = "";
  const newList = list.filter(el => removeSpaces(el.filter_video.filter_name) == data);
  
  createGallery(newList);
}
