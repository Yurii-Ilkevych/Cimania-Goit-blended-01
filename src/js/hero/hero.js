// const starRatingContainer = document.querySelector('.star-rating');
// const starIcons = starRatingContainer.querySelectorAll('.star-icon');

// const percentageRating = (rating / 5) * 100; // Assuming the rating is on a scale of 0 to 5

// starIcons.forEach((star, index) => {
//   if (percentageRating >= (index + 1) * 20) {
//     star.classList.add('filled');
//   }
// });

import axios from 'axios';
import { KEY } from '../API';


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


doTryOrCatch();

async function doTryOrCatch() {
  try {
    const trendsMovies = await fetchTrendsFilm();
    console.log(trendsMovies);
    console.log(trendsMovies.data.results.length);
    if (trendsMovies.status !== 200) {
      throw new Error();
    }
    choiseRender(trendsMovies.data);
  } catch (error) {}
}

function choiseRender(data) {
  if (data.results.length > 1) {
    console.log(data);
    updateHeroSection(data.results[randomMovie()]);
    // renderOneTrendsMovie(data.results[randomMovie()]);
  }
}

function updateHeroSection(movie) {
  console.log(movie);
  const movieHtml = renderOneTrendsMovie(movie);
  refs.heroSection.innerHTML = '';
  refs.heroSection.insertAdjacentHTML('beforeend', movieHtml);
}

function renderOneTrendsMovie(movie) {
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
          <!-- <div class="rating-bg" aria-hidden="true">★★★★★</div> -->
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

