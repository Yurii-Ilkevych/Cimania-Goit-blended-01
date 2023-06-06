import { save, load } from './functions/loadPosterFromStorage';
import { createMarkupMyLibrary } from './functions/createMarkupMyLibrary';
import { addMarkupInLibrary } from './functions/addMarkupInLibrary';

const firstBox = document.querySelector('.first-box-library');
const select = document.querySelector('.select');

changeLibrary();

function changeLibrary() {
  const dataFilm = load('poster1');
  if (dataFilm === undefined || dataFilm.length === 0) {
    if (firstBox.classList.contains('is-hidden')) {
      firstBox.classList.remove('is-hidden');
      return;
    }
    return;
  } else {
    firstBox.classList.add('is-hidden');
    select.classList.remove('is-hidden');
    const newMarkup = createMarkupMyLibrary(dataFilm);
    addMarkupInLibrary(newMarkup);
  }
}
