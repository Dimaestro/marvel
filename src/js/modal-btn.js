import { MarvelApi } from './marvel-api';


const marvelApi = new MarvelApi();

const elements = {
  // Modal window
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  backDrop: document.querySelector('[data-backdrop]'),
  modalGalleryCharacters: document.querySelector('.js-modal-gallery'),
  modalComicsList: document.querySelector('.js-modal-comics-list'),
  modalAboutCharacters: document.querySelector('.js-modal-about-char'),

  
};

elements.openModalBtn.addEventListener('click', openModal);
elements.closeModalBtn.addEventListener('click', () => {
  deleteListenerModal();
  clearModal();
});

async function openModal(event) {
  if (event.target.classList.contains('characters-page-img')) {
    // const {
    //   data: {
    //     data: { results },
    //   },
    // } = await marvelApi.getCharactersById(event.target.id);
    // console.log(results);

    // const responce = await marvelApi.getCharactersByIdName(event.target.id);
    // console.log(responce);
    // const {
    //   data: {
    //     data: { results: resultsComics },
    //   },
    // } = responce;
    // console.log(resultsComics[0].title);

    // const dataComics = resultsComics.map(item => {
    //   return {
    //     title: item.title,
    //     creators: item.creators.items[0],
    //     path: item.thumbnail.path,
    //     extension: item.thumbnail.extension,
    //   };
    // });

    // console.log(dataComics);

    // const charactersComics = results[0].comics.items.slice(0, 3);
    // const comicsName = charactersComics.map(el => {
    //   return el.name
    // })
    // console.log(comicsName);

    const all = await Promise.allSettled([
      marvelApi.getCharactersById(event.target.id),
      marvelApi.getCharactersByIdName(event.target.id),
    ]);

    console.log(all[1].value.data.data.results);

    elements.modalGalleryCharacters.insertAdjacentHTML(
      'afterbegin',
      renderModalCharacters(all[0].value.data.data.results)
    );

    elements.modalAboutCharacters.insertAdjacentHTML(
      'afterbegin',
      renderModalAboutCharacters(all[0].value.data.data.results)
    );

    elements.modalComicsList.insertAdjacentHTML(
      'afterbegin',
      renderModalComicsList(all[1].value.data.data.results)
    );

    elements.modal.classList.toggle('is-hidden');
    listenerModal();

  } else {
    console.log('hello');
  }
}

function closeModal(event) {
  if (event.code === 'Escape') {
    deleteListenerModal();
    clearModal();
  }

  if (event.target === elements.backDrop) {
    deleteListenerModal();
    clearModal();
  }
}

function listenerModal() {
  document.addEventListener('keydown', closeModal);
  elements.backDrop.addEventListener('click', closeModal);

  setTimeout(() => {
    
    // Gallery slider
    const imgMaxConteiner = document.querySelector('.js-img-max-conteiner');
    const imgMax = document.querySelector('.js-img-max');
    const closeModalBtn = document.querySelector("[data-modal-close]");
    const imgMinList = document.querySelector('.js-img-list');
    
    imgMinList.addEventListener('click',onClickReplaceImg);
    elements.closeModalBtn.addEventListener("click", onRerenderModalGalleryImg);
  }, 1000)
  
}

function deleteListenerModal() {
  elements.modal.classList.add('is-hidden');

  document.removeEventListener('keydown', closeModal);
  elements.backDrop.removeEventListener('click', closeModal);
}

function clearModal() {
  elements.modalGalleryCharacters.innerHTML = '';

  elements.modalAboutCharacters.innerHTML = '';

  elements.modalComicsList.innerHTML = '';
}

function onClickReplaceImg(event) {
  if(event.target.classList.contains('js-img-min')) {
    let pathNewMaxImg = event.target.src;
    renderImgGallery(pathNewMaxImg);
  }
}

function onRerenderModalGalleryImg() {
  console.log(elements.imgMax.src);
  renderImgGallery(elements.imgMax.src)
}

function renderImgGallery(path) {
  elements.imgMaxConteiner.innerHTML = `<img src="${path}" alt="" width="295" height="387">` 
}

function renderModalCharacters(array) {
  return array
    .map(el => {
      return `
          <div class="container-img-max js-img-max-conteiner">
            <img class="js-img-max" src="${el.thumbnail.path}/detail.${el.thumbnail.extension}" alt="" width="295" height="387">
          </div>
          <div class="container-img-min">
            <ul class="img-list js-img-list">
              <li class="img-item">
                <img class="js-img-min" src="${el.thumbnail.path}/detail.${el.thumbnail.extension}" alt="" width="80" height="80">
              </li>
              <li class="img-item">
                <img class="js-img-min" src="${el.thumbnail.path}/detail.${el.thumbnail.extension}" alt="" width="80" height="80">
              </li>
              <li class="img-item">
                <img class="js-img-min" src="${el.thumbnail.path}/detail.${el.thumbnail.extension}" alt="" width="80" height="80">
              </li>
            </ul>
          </div>`;
    })
    .join('');
}

function renderModalComicsList(array) {
  return array
    .map(item => {
      return `
    <li class="modal-comics-item">
                <img class="comics-img-container" src="${item.thumbnail.path}/detail.${item.thumbnail.extension}" alt="${item.title}" width="263px" height="263px">
                <div class="comics-desc-container">
                  <h3 class="comics-name">${item.title}</h3>
                  <p class="actress"></p>
                </div>
              </li>`;
    })
    .join('');
}

function renderModalAboutCharacters(array) {
  return array
    .map(el => {
      return `
    <h2 class="modal-char-title">${el.name}</h2>
            <p class="date-comics-modal">
              ${el.modified}
            </p>
            <p class="about-char-description">
              ${el.description}
            </p>`;
    })
    .join('');
}
