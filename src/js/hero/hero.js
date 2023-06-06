import axios from 'axios';
import { KEY } from '../API';
import { openTrailerModal, closeTrailerModal, handleTrailerModalKeyDown } from '../trailler-movie/trailler-movie';

const refs = {
  heroSection: document.querySelector('.hero-upd'),
};

const randomMovie = () => {
  return Math.floor(Math.random() * (19 - 0 + 1)) + 0;
};

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWI4YTU2N2U4NTIwYjJkOTYxNmQyYjU1NGY1MGI4MyIsInN1YiI6IjY0Nzg5MDY0MDc2Y2U4MDEwNzliOGMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ia6cdeIOjpNaTQl8aCiS1rstAtEfICJgybU1GCz5mQ',
  },
};

async function fetchTrendingMovies() {
  const response = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    options
  );
  return response;
}

async function handleTryCatch() {
  try {
    const trendingMovies = await fetchTrendingMovies();
    console.log(trendingMovies);
    console.log(trendingMovies.data.results.length);
    if (trendingMovies.status !== 200) {
      throw new Error();
    }
    chooseRender(trendingMovies.data);
  } catch (error) {}
}

function chooseRender(data) {
  if (data.results.length > 1) {
    console.log(data);
    updateHeroSection(data.results[randomMovie()]);
  }
}

function updateHeroSection(movie) {
  console.log(movie);
  const movieHtml = renderTrendingMovie(movie);
  refs.heroSection.innerHTML = '';
  refs.heroSection.insertAdjacentHTML('beforeend', movieHtml);

  const openTrailerBtn = document.getElementById('hero-trailer-btn');
  const closeModalBtn = document.querySelector('[data-hero-modal-close]');

  openTrailerBtn.addEventListener('click', () => openTrailerModal(movie));
  closeModalBtn.addEventListener('click', closeTrailerModal);
  document.addEventListener('keydown', handleTrailerModalKeyDown);
}

function renderTrendingMovie(movie) {
  console.log(movie);
  return `<section
  class="hero-rendered"
  style="background-image: url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')"
>
  <div class="hero-rendered-gradient">
    <div class="container">
      <div class="hero-rendered-wrap">
        <h1 class="hero-default-tille rendered" data-id="${movie.id}">${movie.original_title}</h1>
        <div class="hero-star">
          <div class="rating" data-rating="4.5" aria-hidden="true">★★★★★</div>
        </div>
        <p class="hero-default-text rendered">
          ${movie.overview}
        </p>
        <div class="hero-trailer-btn-wrap">
          <div class="hero-trailer-btn-gr">
            <button
              class="hero-trailer-btn"
              id="hero-trailer-btn"
              type="button"
              data-id="${movie.id}"
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

handleTryCatch();
