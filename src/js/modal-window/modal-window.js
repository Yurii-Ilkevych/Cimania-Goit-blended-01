import axios from 'axios';
import { changeLibrary } from '../added-movies/added-movies';
// ------------------Закриття та відкриття модалки---------------

const refs = {
  closeModalBtn: document.querySelector('[data-modal-close-test]'),
  modal: document.querySelector('[data-modal-test]'),
  backdrop: document.querySelector('.overlay'),
  modalWindow: document.querySelector('.pop-modal'),
};

refs.closeModalBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', closeModal);
refs.modal.addEventListener('click', stopPropagation);
refs.modalWindow.addEventListener('click', stopPropagation);

let movieID;
let movieDataFetched = false;
let movieObjects;
const defaulPoster = 'rmmKVswMSMJfBxPAe4rn5jN2Tb0.jpg';
export function openModal(id) {
  movieID = id;
  refs.modal.classList.remove('hidden');
  document.addEventListener('keydown', handleKeyPress);
  document.documentElement.style.overflow = 'hidden';
  if (!movieDataFetched) {
    fetchMovieDetails(movieID);
  }
}

function closeModal() {
  refs.modal.classList.add('hidden');
  document.removeEventListener('keydown', handleKeyPress);
  document.documentElement.style.overflow = '';
  changeLibrary();
  imgBlock.innerHTML = '';
  movieBlock.innerHTML = '';

  addToLibraryButton.removeEventListener('click', onaAddToLibraryButton);
  removeToLibraryButton.removeEventListener('click', onRemoveToLibraryButton);
}

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

// -------------------------API----------------------------

const API_KEY_KOV = 'c8c2a74c43d87203307f2db942752251';
const imgBlock = document.querySelector('.container-img');
//const movieBlock = document.querySelector('.container-item');
const movieBlock = document.querySelector('.container-item-render');

const addToLibraryButton = document.querySelector('.modal-add-btn');
const removeToLibraryButton = document.querySelector('.modal-remove-btn');

function fetchMovieDetails(movieID) {
  const URL_KOV = `https://api.themoviedb.org/3/movie/${movieID}`;

  axios
    .get(`${URL_KOV}?api_key=${API_KEY_KOV}`)
    .then(response => {
      const movieData = response.data;
      const posterPath = getPosterPath(movieData.poster_path);
      const movieTitle = movieData.title;
      const rating = Number(movieData.vote_average.toFixed(1));
      const votes = movieData.vote_count.toString().slice(0, 4);
      const popularity = Number(movieData.popularity.toFixed(1));
      const genre = movieData.genres.map(genre => genre.name).join(' ');
      const overview = movieData.overview;
      const release_date = movieData.release_date;

      //const getImg = `<div class="container-img"><img class="img-pop-modal" src="https://image.tmdb.org/t/p/w500/${posterPath}" alt="film" /></div>`

      //<img class="list-movie-block-img" src="https://image.tmdb.org/t/p/original//rmmKVswMSMJfBxPAe4rn5jN2Tb0.jpg" alt="NO NAME"></img>
      const getImg = `<img loading="lazy" class="img-pop-modal" src="https://image.tmdb.org/t/p/w500/${posterPath}" alt="film" />`;

      imgBlock.innerHTML = getImg;

      //imgBlock.insertAdjacentHTML('afterbegin', getImg);

      const getMovie = `<h2 class="name-film-pop-modal">${movieTitle}</h2>
        <div class="vote-votes-pop-modal-container">
          <p class="vote-votes-pop-modal-text">Vote / Votes</p>
          <div class="vote-data-container-pop-modal">
            <span class="vote-data-pop-modal">${rating}</span>
          </div>
          <div class="devider-data-pop-modal">/</div>
          <div class="votes-data-container-pop-modal">
            <span class="votes-data-pop-modal">${votes}</span>
          </div>
        </div>
        <div class="popularity-pop-modal-container">
          <p class="popularity-pop-modal-text">Popularity</p>
          <div class="popularity-data-pop-modal">${popularity}</div>
        </div>
        <div class="gerne-pop-modal-container">
          <p class="gerne-pop-modal-text">Genre</p>
          <div class="gerne-data-pop-modal">${genre}</div>
        </div>
        <h2 class="about-pop-modal-text">About</h2>
        <div class="about-pop-modal-description">
          ${overview}
        </div>`;

      movieBlock.innerHTML = getMovie;

      //movieBlock.insertAdjacentHTML('afterbegin', getMovie);

      // -------------------------LOCAL STORAGE-----------------
      const movieObject = {
        movieID,
        posterPath,
        movieTitle,
        rating,
        votes,
        popularity,
        genre,
        overview,
        release_date,
      };
      movieObjects = movieObject;
      // const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];
      // const movieIndex = existingMovies.findIndex(
      //   movie => movie.movieID === movieID
      // );

      // if (movieIndex > -1) {
      //   existingMovies.splice(movieIndex, 1);
      // }

      removeToLibraryButton.addEventListener('click', onRemoveToLibraryButton);
      addToLibraryButton.addEventListener('click', onaAddToLibraryButton);

      toggleButtons();

      //movieDataFetched = true;
    })
    .catch(error => {
      //console.error(error);
      console.log('THE SERVER DID NOT RESPOND');
      defoltRender();
    });
}

function onRemoveToLibraryButton() {
  const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];
  const updatedMovies = existingMovies.filter(
    movie => movie.movieID !== movieID
  );
  localStorage.setItem('movies', JSON.stringify(updatedMovies));
  toggleButtons();
}

function onaAddToLibraryButton() {
  const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];
  const movieIndex = existingMovies.findIndex(
    movie => movie.movieID === movieID
  );
  if (movieIndex === -1) {
    existingMovies.push(movieObjects);
    localStorage.setItem('movies', JSON.stringify(existingMovies));
    toggleButtons();
  }
}

function getPosterPath(poster) {
  if (poster) {
    return poster;
  }
  return defaulPoster;
}

// -------------------------Заміна кнопки-----------------
function toggleButtons() {
  const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];
  const movieIndex = existingMovies.findIndex(
    movie => movie.movieID === movieID
  );

  if (movieIndex > -1) {
    addToLibraryButton.style.display = 'none';
    removeToLibraryButton.style.display = 'block';
  } else {
    addToLibraryButton.style.display = 'block';
    removeToLibraryButton.style.display = 'none';
  }
}

////////////// defoltRender

function defoltRender() {
  const defoltMovieMarcup = `<h2 class="name-film-pop-modal">No Tittle</h2>
<div class="vote-votes-pop-modal-container">
<p class="vote-votes-pop-modal-text">Vote / Votes</p>
<div class="vote-data-container-pop-modal">
<span class="vote-data-pop-modal">0</span>
</div>
<div class="devider-data-pop-modal">/</div>
<div class="votes-data-container-pop-modal">
<span class="votes-data-pop-modal">0</span>
</div>
</div>
<div class="popularity-pop-modal-container">
<p class="popularity-pop-modal-text">Popularity</p>
<div class="popularity-data-pop-modal">0</div>
</div>
<div class="gerne-pop-modal-container">
<p class="gerne-pop-modal-text">Genre</p>
<div class="gerne-data-pop-modal">No genre</div>
</div>
<h2 class="about-pop-modal-text">About</h2>
<div class="about-pop-modal-description">
No description
</div>`;

  const defolttImgMarcup = `<img loading="lazy" class="img-pop-modal" src="https://image.tmdb.org/t/p/w500/rmmKVswMSMJfBxPAe4rn5jN2Tb0.jpg" alt="film" />`;

  imgBlock.innerHTML = defolttImgMarcup;
  movieBlock.innerHTML = defoltMovieMarcup;

  addToLibraryButton.style.display = 'none';
  removeToLibraryButton.style.display = 'none';
}
