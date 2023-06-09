import axios from 'axios';
import { addBackToTop } from 'vanilla-back-to-top'; // Back tp top 
import { KEY } from '../API';
import { openModal } from '../modal-window/modal-window';
import {openTrailerModal, closeTrailerModal, handleTrailerModalKeyDown } from '../trailler-movie/trailler-movie'

// Back tp top 
addBackToTop({
  diameter: 50,
  backgroundColor: 'var(--color-secondary-black)',
  textColor: '#fff',
  scrollDuration: 300, // ms
});

const HERO__KEY = 'hero-key';

const refs = {
  heroSection: document.querySelector('.hero-upd'),
};

// вибір рандомного фільму з 20
const randomMovie = () => {
  return Math.floor(Math.random() * (19 - 0 + 1)) + 0;
};

// налаштування запиту
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWI4YTU2N2U4NTIwYjJkOTYxNmQyYjU1NGY1MGI4MyIsInN1YiI6IjY0Nzg5MDY0MDc2Y2U4MDEwNzliOGMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ia6cdeIOjpNaTQl8aCiS1rstAtEfICJgybU1GCz5mQ',
  },
};

// запит на сервер
async function fetchTrendsFilm() {
  const response = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    options
  );
  return response;
}

// виклик при оновленні сторінки
doTryOrCatch();

// обробка запиту
async function doTryOrCatch() {
  try {
    const trendsMovies = await fetchTrendsFilm();
    // console.log(trendsMovies);
    // console.log(trendsMovies.data.results.length);
    if (trendsMovies.status !== 200) {
      throw new Error();
    }
    choiseRender(trendsMovies.data);
  } catch (error) {
    renderDefaultSection();
  }
}

// перевірка даних та виклик оновлення
function choiseRender(data) {
  if (data.results.length > 1) {
    // console.log(data);
    const film = data.results[randomMovie()];
    updateHeroSection(film);
    addHeroSessionStorage([film]);
  }
}

// оновлення секції Hero
function updateHeroSection(movie) {
  // console.log(movie);
  const movieHtml = renderOneTrendsMovie(movie);
  refs.heroSection.innerHTML = '';
  refs.heroSection.insertAdjacentHTML('beforeend', movieHtml);
  const moreDetailsBtn = document.getElementById('hero-more-btn');
  moreDetailsBtn.addEventListener('click', handleMoreDetailsClick);
  const watchTrailerBtn = document.getElementById('hero-trailer-btn');
  watchTrailerBtn.addEventListener('click', handlewatchTrailerClick);
}

// modal More Details
function handleMoreDetailsClick() {
  // console.log('click on More details btn');
  const movieId = document.querySelector('.hero-default-tille.rendered');
  const dataId = movieId.getAttribute('data-id');
  // console.log(dataId);
  openModal(dataId, HERO__KEY);
}

// modal Whatch Trailer
function handlewatchTrailerClick() {


  const movieId = document.querySelector('.hero-default-tille.rendered').getAttribute('data-id');
  
  // Открыть модальное окно с трейлером
  openTrailerModal({ id: movieId });

  // Закрыть модальное окно с трейлером по нажатию клавиши Escape
  document.addEventListener('keydown', handleTrailerModalKeyDown);

  // Получаем ссылку на кнопку закрытия модального окна
  const closeButton = document.querySelector('[data-modal-close]');

  // Добавляем обработчик события на клик кнопки закрытия
  closeButton.addEventListener('click', closeTrailerModal);

  // Функция для закрытия модального окна
  closeTrailerModal()


  
  // console.log('click on whatch trailer btn');
  // const movieId = document.querySelector('.hero-default-tille.rendered');
  // const dataId = movieId.getAttribute('data-id');
  // console.log(dataId);
  // openModal(dataId); // replace it with imported function
}

// Makes rating for 5 star beckgroung
function makeRating(data) {
  return Math.round(data * 10);
}

// Makes rating for screen readers
function screenReaderRating(data) {
  return Math.round((data / 2) * 10) / 10;
}

// Daily trending moovie markup
function renderOneTrendsMovie(movie) {
  // console.log(movie);
  const movieRating = makeRating(movie.vote_average);
  const screenReaderMovieRating = screenReaderRating(movie.vote_average);
  // console.log(movie.vote_average);
  // console.log(movieRating);
  return `<section
  class="hero-rendered"
  style="background-image: url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')"
>
  <div class="hero-rendered-gradient">
    <div class="container">
      <div class="hero-rendered-wrap">
        <h1 class="hero-default-tille rendered" data-id="${movie.id}">${movie.original_title}</h1>
        <p class="rating" aria-label="${screenReaderMovieRating} stars out of 5" style="background: linear-gradient(
        to right,
        var(--color-orange),
        var(--color-orange),
        ${movieRating}%,
        var(--color-gray-white-theme) 1%,
        var(--color-gray-white-theme) 99%
        );
        background-clip: text;
        -webkit-background-clip: text;
        color: rgba(0, 0, 0, 0);
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2)">★★★★★</p>
        <p class="hero-default-text rendered">
          ${movie.overview}
        </p>
        <div class="hero-trailer-btn-wrap">
          <div class="hero-trailer-btn-gr">
            <button
              class="hero-trailer-btn"
              data-id="${movie.id}" 
              id="hero-trailer-btn"
              type="button"
            >
              Watch trailer
            </button>
          </div>
          <div>
            <button 
            class="hero-more-btn"
            data-id="${movie.id}" 
            id="hero-more-btn" 
            type="button">
              More details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

// Default hero section
function renderDefaultSection() {
  const defaultSection = `<div class="hero-upd" >
  <section class="hero-default">
    <div class="container">
      <div class="hero-default-wrap">
        <h1 class="hero-default-tille">Let’s Make Your Own Cinema</h1>
        <p class="hero-default-text">
          Is a guide to creating a personalized movie theater experience. You'll
          need a projector, screen, and speakers.<span
            class="hero-default-text extended"
            >Decorate your space, choose your films, and stock up on snacks for
            the full experience.</span
          >
        </p>
        <a href="../catalog.html" class="hero-get-started-btn">Get Started</a>
      </div>
    </div>
  </section>`;
  refs.heroSection.innerHTML = '';
  refs.heroSection.insertAdjacentHTML('beforeend', defaultSection);
}


function addHeroSessionStorage(list) {
  const strList = JSON.stringify(list);
  sessionStorage.setItem(HERO__KEY, strList);
}
