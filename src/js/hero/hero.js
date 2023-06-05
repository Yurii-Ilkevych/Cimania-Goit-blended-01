import axios from 'axios';
import { KEY } from '../API';
import { openModal } from '../modal-window/modal-window';

const refs = {
  heroSection: document.querySelector('.hero-upd'),
};

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

function choiseRender(data) {
  if (data.results.length > 1) {
    // console.log(data);
    updateHeroSection(data.results[randomMovie()]);
  }
}

function updateHeroSection(movie) {
  // console.log(movie);
  const movieHtml = renderOneTrendsMovie(movie);
  refs.heroSection.innerHTML = '';
  refs.heroSection.insertAdjacentHTML('beforeend', movieHtml);
  const moreDetailsBtn = document.getElementById('hero-more-btn');
  moreDetailsBtn.addEventListener('click', handleMoreDetailsClick);
}

// modal 
function handleMoreDetailsClick() {
  // console.log('click on More details btn');
  const movieId = document.querySelector('.hero-default-tille.rendered');
  const dataId = movieId.getAttribute('data-id');
  // console.log(dataId); 
  openModal(dataId);

}

function makeRating(data) {
  return Math.round(data * 10);
}

function screenReaderRating(data) {}

function renderOneTrendsMovie(movie) {
  // console.log(movie);
  const movieRating = makeRating(movie.vote_average);
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
        <p class="rating" data-rating="4.5" aria-label="4.5 stars out of 5" style="background: linear-gradient(
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
              id="hero-trailer-btn"
              type="button"
            >
              Watch trailer
            </button>
          </div>
          <div>
            <button class="hero-more-btn" id="hero-more-btn" type="button">
              More details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

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
