import axios from 'axios';
import { KEY } from '../API';

const refs = {
  upcomingFilmEl: document.querySelector('.upcoming-film'),
  btnAddToMyLibraryEl: document.querySelector('.add-to-my-library'),
  btn: document.getElementById('btn'),
};

const randomNumber = Math.random() * (10 - 1) + 1;
const defImg = 'Coming-soon.png';

// _________________Getting Films_________________//

async function getUpcomingFilm() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${randomNumber.toFixed()}&api_key=${KEY}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

// _________________Getting Genres________________//

async function getGenres() {
  try {
    const genres = await axios.get(`
    https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${KEY}`);
    return genres;
  } catch (error) {
    console.log(error);
  }
}

// _______________Creating Markup_________________//

function createUpcomingFilmMarkup(response, genres) {
  if (response === undefined) {
    return;
  }
  let foto;
  let miniFoto;

  if (response.data.results[randomNumber.toFixed()].backdrop_path === null) {
    foto = defImg;
  } else {
    foto =
      'https://image.tmdb.org/t/p/original/' +
      response.data.results[randomNumber.toFixed()].backdrop_path;
  }

  if (response.data.results[randomNumber.toFixed()].poster_path === null) {
    miniFoto = defImg;
  } else {
    miniFoto =
      'https://image.tmdb.org/t/p/original/' +
      response.data.results[randomNumber.toFixed()].poster_path;
  }

  function findGenre(genre, arr) {
    let genreName = '';
    const x = arr.map(el => {
      if (el.id === genre) {
        genreName = el.name;
      }
    });
    return genreName;
  }

  const firstGenreToFind =
    response.data.results[randomNumber.toFixed()].genre_ids[0];
  const secondGenreToFind =
    response.data.results[randomNumber.toFixed()].genre_ids[1];

  const firstGenre = findGenre(firstGenreToFind, genres.data.genres);
  const secondGenre = findGenre(secondGenreToFind, genres.data.genres)
    ? ', ' + findGenre(secondGenreToFind, genres.data.genres)
    : '';

  const markup = `
      <div class="upcoming-film-img-wrap">
       <picture class="upcoming-film-img">
  <source srcset="${miniFoto}" media="(max-width: 767px)" />
  <img
  loading="lazy"
          src="${foto}"
          alt="Image of the upcoming film"
        />
</picture>
      </div>
      <div class="about-upcoming-film">
        <h3 class="upcoming-film-name">${
          response.data.results[randomNumber.toFixed()].title
        }</h3>
        <div class="upcoming-film-info-wrap">
          <div class="upcoming-film-info-part1">
            <div class="upcoming-film-info-rows">
              <p class="upcoming-film-info-row1">Release date</p>
              <p>Vote / Votes</p>
            </div>
            <div class="upcoming-film-info-rows">
              <p class="upcoming-film-info-row1 info-orange-text">${
                response.data.results[randomNumber.toFixed()].release_date
              }</p>
              <div class="info-votes-value-wrap">
                <div class="info-votes-value-white-wrap">
                  <p>${
                    response.data.results[randomNumber.toFixed()].vote_average
                  }</p>
                </div>
                <p class="info-white-text">/</p>
                <div class="info-votes-value-white-wrap">
                  <p>${
                    response.data.results[randomNumber.toFixed()].vote_count
                  }</p>
                </div>
              </div>
            </div>
          </div>
          <div class="upcoming-film-info-part2">
            <div class="upcoming-film-info-rows">
              <p class="upcoming-film-info-row1">Popularity</p>
              <p>Genre</p>
            </div>
            <div class="upcoming-film-info-rows info-white-text">
              <p class="upcoming-film-info-row1">${
                response.data.results[randomNumber.toFixed()].popularity
              }</p>
              <p>${firstGenre}${secondGenre}</p>
            </div>
          </div>
        </div>
        <div class="upcoming-film-description">
          <h4 class="upcoming-film-description-title">ABOUT</h4>
          <div class="upcoming-film-description-text-wrap">
            <p class="upcoming-film-description-text">${
              response.data.results[randomNumber.toFixed()].overview
            }
            </p>
          </div>
          <button type="button" id="btn" class="add-to-my-library">
            Add to my library
          </button>
        </div>
      </div>`;

  return markup;
}

// ____________Rendering________________//

function renderUpcomingFilm(markup) {
  if (markup === undefined) {
    return (refs.upcomingFilmEl.innerHTML =
      '<img loading="lazy" src="./img/popupon404.jpeg" alt="No film found">');
  }
  return (refs.upcomingFilmEl.innerHTML = markup);
}

// _______________MAIN___________________//

async function showUpcomingFilm() {
  const response = await getUpcomingFilm();
  const genres = await getGenres();
  const markup = createUpcomingFilmMarkup(response, genres);
  const rendering = renderUpcomingFilm(markup);

  const btnAdd = document.getElementById('btn');

  handleAddRemooveToLibrary(response, btnAdd);
}

showUpcomingFilm();

// __________________local storage_________________//

function handleAddRemooveToLibrary(response, btnAdd) {
  if (response === undefined) {
    return;
  }
  if (btnAdd === null) {
    return;
  }

  const movieObject = {
    movieID: `${response.data.results[randomNumber.toFixed()].id}`,
    posterPath: response.data.results[randomNumber.toFixed()].poster_path,
    movieTitle: response.data.results[randomNumber.toFixed()].title,
    rating: response.data.results[randomNumber.toFixed()].vote_average,
    votes: response.data.results[randomNumber.toFixed()].vote_count,
    popularity: response.data.results[randomNumber.toFixed()].popularity,
    gerne: response.data.results[randomNumber.toFixed()].genre_ids,
    overview: response.data.results[randomNumber.toFixed()].overview,
  };
  const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];

  const movieIndex = existingMovies.findIndex(
    movie =>
      movie.movieID === `${response.data.results[randomNumber.toFixed()].id}`
  );

  const updatedMovies = existingMovies.filter(
    movie =>
      movie.movieID !== `${response.data.results[randomNumber.toFixed()].id}`
  );

  if (movieIndex > -1) {
    btnAdd.textContent = 'Remove from my library';
  }

  btnAdd.addEventListener('click', function () {
    const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];

    const movieIndex = existingMovies.findIndex(
      movie =>
        movie.movieID === `${response.data.results[randomNumber.toFixed()].id}`
    );

    if (movieIndex === -1) {
      existingMovies.push(movieObject);
      localStorage.setItem('movies', JSON.stringify(existingMovies));
      btnAdd.textContent = 'Remove from my library';
    }
    if (movieIndex > -1) {
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      btnAdd.textContent = 'Add to my library';
    }
  });
}
