import { changeLibrary } from '../added-movies/added-movies';
import { renderMovie } from './render-movie';
import { getGanre } from '../request-processing';
const refs = {
  closeModalBtn: document.querySelector('.modal-close-icon'),
  clouseIcon: document.querySelector('.svg-close-modal'),
  modal: document.querySelector('[data-modal-test]'),
  backdrop: document.querySelector('.overlay'),
  imgBlock: document.querySelector('.container-img'),
  movieBlock: document.querySelector('.container-item-render'),
  addToLibraryButton: document.querySelector('.modal-add-btn'),
  removeToLibraryButton: document.querySelector('.modal-remove-btn'),
};

let movieID;
let movieObjects;

export function openModal(id, key) {
  movieID = Number(id);
  refs.modal.classList.remove('hidden');
  document.documentElement.style.overflow = 'hidden';

  refs.backdrop.addEventListener('click', doChoise);
  window.addEventListener('keydown', doChoise);
  fetchMovieDetails(movieID, key);
}

function doChoise(event) {
  const { currentTarget, target, code } = event;
  if (
    currentTarget === target ||
    target === refs.closeModalBtn ||
    target === refs.clouseIcon ||
    code === 'Escape'
  ) {
    closeModal();
  }
  if (target === refs.addToLibraryButton) {
    onAddToLibraryButton();
  } else if (target === refs.removeToLibraryButton) {
    onRemoveToLibraryButton();
  }
}

function closeModal() {
  refs.modal.classList.add('hidden');
  document.documentElement.style.overflow = '';
  refs.imgBlock.innerHTML = '';
  refs.movieBlock.innerHTML = '';
  refs.backdrop.removeEventListener('click', doChoise);
  document.removeEventListener('keydown', doChoise);
  if (window.location.pathname.includes('my-library.html')) {
    changeLibrary();
  }
}

function fetchMovieDetails(movieID, key) {
  let myFilm = null;
  let films = null;

  if (key === 'movies') {
    films = getAddedMovies();
  } else {
    films = JSON.parse(sessionStorage.getItem(key));
  }
  for (const element of films) {
    if (element.id === Number(movieID)) {
      myFilm = films[films.indexOf(element)];
    }
  }
  renderMovie(myFilm);
  movieObjects = myFilm;
  toggleButtons();
}

function onRemoveToLibraryButton() {
  const existingMovies = getAddedMovies();
  const updatedMovies = existingMovies.filter(movie => movie.id !== movieID);
  localStorage.setItem('movies', JSON.stringify(updatedMovies));
  toggleButtons();
}

async function onAddToLibraryButton() {
  const existingMovies = getAddedMovies();
  if (!checkId()) {
    movieObjects.genres = await getGanre(movieObjects.id)
    existingMovies.push(movieObjects);
    localStorage.setItem('movies', JSON.stringify(existingMovies));
    toggleButtons();
  }
}

function toggleButtons() {
  if (checkId()) {
    refs.addToLibraryButton.style.display = 'none';
    refs.removeToLibraryButton.style.display = 'block';
  } else {
    refs.addToLibraryButton.style.display = 'block';
    refs.removeToLibraryButton.style.display = 'none';
  }
}
function getAddedMovies() {
  return JSON.parse(localStorage.getItem('movies')) || [];
}

function checkId() {
  const existingMovies = getAddedMovies();
  return existingMovies.map(movie => movie.id).includes(movieID);
}
