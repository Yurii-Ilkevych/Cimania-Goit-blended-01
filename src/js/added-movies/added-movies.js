import { save, load } from './functions/loadPosterFromStorage';
import { createMarkupMyLibrary } from './functions/createMarkupMyLibrary';
import { addMarkupInLibrary } from './functions/addMarkupInLibrary';
import { openModal } from '../modal-window/modal-window';

const firstBox = document.querySelector('.first-box-library');
const select = document.querySelector('.select');
const galleryList = document.querySelector('.library-gallery');

changeLibrary();
addEventListenerForGallery();
export function changeLibrary() {
  if (!window.location.pathname.includes('my-library.html')) {
    return;
  }
  const dataFilm = load('movies');
  if (dataFilm === undefined || dataFilm.length === 0) {
    if (firstBox.classList.contains('is-hidden')) {
      firstBox.classList.remove('is-hidden');
      select.classList.add('is-hidden');
      addMarkupInLibrary('');
      return;
    }
    return;
  } else {
    firstBox.classList.add('is-hidden');
    select.classList.remove('is-hidden');
    const newMarkup = createMarkupMyLibrary(dataFilm);
    addMarkupInLibrary(newMarkup);
    return;
  }
}

function addEventListenerForGallery() {
  if (!window.location.pathname.includes('my-library.html')) {
    return;
  }
  galleryList.addEventListener('click', opnModalWindow);
}

function opnModalWindow(e) {
  const elementClick = e.target.parentNode;
  if (elementClick.nodeName !== 'LI') {
    return;
  }
  const idCard = elementClick.id;
  openModal(idCard);
}
