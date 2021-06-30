const wrapper = document.querySelector('.filter-wrapper.photo');
const wrapperGallery = document.querySelector('#lightgallery');

const listPhoto = [
  {
    img: "./assets/images/photo/DSC00281.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00374.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00397.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00408.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00472.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00608.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00663.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00752.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00761.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00764.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00782.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00793.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00799.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00802.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00821.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00911.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC00913.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC01080.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC01111.jpg",
    type: 1
  },
  {
    img: "./assets/images/photo/DSC01119.jpg",
    type: 1
  },
  {
    img: "./assets/images/carousel/image-1.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-2.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-3.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-4.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-5.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-6.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-7.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-8.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-9.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-10.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-11.png",
    type: 2
  },
  {
    img: "./assets/images/carousel/image-12.png",
    type: 2
  }
]

init();

function init() {
  if (!wrapper && !wrapperGallery) return
  createGallery(listPhoto);
  addActive();
  initGallery()
}

function createGallery(list) {
  list.forEach(item => {
    wrapperGallery.insertAdjacentHTML('afterbegin', `
    <div class="col-12 col-sm-6 col-md-4 col-xl-3 mt-30 gallery-item-grid" data-filter="type-${item.type}">
      <a href="${item.img}" class="gallery-item">
        <img src="${item.img}" alt="" />
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

  window.lgData[wrapperGallery.getAttribute('lg-uid')].destroy(true);
  initGallery();
}
