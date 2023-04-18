import { MarvelApi } from './marvel-api';
// import renderCharacters from '../templates/render-characters.hbs';
// import 'tui-pagination/dist/tui-pagination.css';

const elements = {
  form: document.querySelector('.js-serch-form'),
  gallery: document.querySelector('.characters-page-list'),
  tuiPagination: document.querySelector('.js-tui-pagination'),
}

const marvelApi= new MarvelApi();

let totalPages = null;

elements.form.addEventListener('submit', onSerchImages);

async function onSerchImages(event) {
  event.preventDefault();

  // elements.tuiPagination.classList.add('is-hidden');
  elements.gallery.innerHTML = '';
  

  const { elements: { searchQuery } } = event.currentTarget;
  marvelApi.nameStartsWith = searchQuery.value;


  try {
    const {data: {data: {results}}} = await marvelApi.getCharactersName();
    console.log(results);

    elements.gallery.insertAdjacentHTML('beforeend', renderCharacters(results));
  
  } catch (error) {
    console.log(error);
  }

}

function renderCharacters(array) {
  return array.map(el => {
    return `
    <li class='characters-page-item'>
    <div class='image-thumb'>
      <img
        id="${el.id}"
        class='characters-page-img'
        src='${el.thumbnail.path}/detail.${el.thumbnail.extension}'
        alt=''
      />
    </div>
    <div class='characters-page-span'>
      <p class='characters-page-name'>${el.name}</p>
    </div>
  </li>`
  }).join('');
}

