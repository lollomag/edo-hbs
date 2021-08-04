const wrapper = document.querySelector('.filter-wrapper.video');
const wrapperGallery = document.querySelector('#modal-videos');

const listPhoto = [
  {
    cover: "https://i.ytimg.com/vi_webp/Ht-9rdT-TaU/maxresdefault.webp",
    title: "Libri tra i Sassi. I best seller di Matera e della Basilicata",
    id: 6,
    inProduction: false,
    type: 2
  },
  {
    cover: "https://i.ytimg.com/vi_webp/GTOAccohMoI/sddefault.webp",
    title: "Wild Farm Cürnigia - crowdfunding campaign",
    id: 5,
    inProduction: false,
    type: 2
  },
  {
    cover: "./assets/images/reality.jpg",
    title: "Reality Sean",
    id: 4,
    inProduction: false,
    type: 1
  },
  {
    cover: "./assets/images/apocalypse.jpg",
    title: "Apocalypse Days",
    id: 3,
    inProduction: false,
    type: 1
  },
  {
    cover: "./assets/images/the-night.jpg",
    title: "THE NIGHT",
    id: 2,
    inProduction: false,
    type: 1
  },
  {
    cover: "./assets/images/up-down.jpg",
    title: "UP & DOWN",
    id: 1,
    inProduction: false,
    type: 1
  },
  {
    cover: "./assets/images/artemisia.jpg",
    title: "Artemisia",
    id: 0,
    inProduction: false,
    type: 1
  }
]

init();

function init() {
  if (!wrapper && !wrapperGallery) return
  createGallery(listPhoto);
  addActive();
}

function createGallery(list) {
  list.forEach((item, index) => {
    if (item.inProduction) {
      wrapperGallery.insertAdjacentHTML('afterbegin', `
    <div class="col-12 col-md-4 mt-30" data-filter="type-${item.type}">
      <div class="simple-video">
        <div class="preview">
          <img src="${item.cover}" alt="">
          <span class="icon material-icons-outlined">movie</span>
        </div>
        <h2 class="title">${item.title}</h2>
      </div>
    </div>
    `)
    } else {
      wrapperGallery.insertAdjacentHTML('afterbegin', `
      <div class="col-12 col-md-4 mt-30" data-filter="type-${item.type}">
        <div class="simple-video">
          <a data-toggle="modal" data-target="#modal-video" data-id="${item.id}" class="preview">
            <img src="${item.cover}" alt="">
            <span class="icon material-icons-outlined">play_circle_outline</span>
          </a>
          <h2 class="title">${item.title}</h2>
        </div>
      </div>
      `)
    }
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
  wrapperGallery.innerHTML = "";
  if (data == 'all') {
    createGallery(listPhoto)
  } else {
    const newList = listPhoto.filter(el => 'type-' + el.type == data);
    createGallery(newList);
  }
}
