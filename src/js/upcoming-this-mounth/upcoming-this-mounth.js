import axios from 'axios';

const refs = {
  upcomingFilmEl: document.querySelector('.upcoming-film'),
  btnAddToMyLibraryEl: document.querySelector('.add-to-my-library'),
};

const MY_API_KEY = 'b9984943b63ba7234c73c01c632259d1';
const randomNumber = Math.random() * (10 - 1) + 1;
const defImg = '../img/defImg.jpeg';

async function getUpcomingFilm() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${randomNumber.toFixed()}&api_key=${MY_API_KEY}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getGenres() {
  try {
    const genres = await axios.get(`
    https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${MY_API_KEY}`);
    return genres;
  } catch (error) {
    console.log(error);
  }
}

function createUpcomingFilmMarkup(response, genres) {
  if (response === undefined) {
    return;
  }
  let foto;

  if (response.data.results[randomNumber.toFixed()].backdrop_path === null) {
    foto = defImg;
  } else {
    foto =
      'https://image.tmdb.org/t/p/original/' +
      response.data.results[randomNumber.toFixed()].backdrop_path;
  }

  function findGenre(genre, arr) {
    let genreName = '';
    const xxx = arr.map(el => {
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
  const secondGenre = findGenre(secondGenreToFind, genres.data.genres);

  const markup = `
      <div class="upcoming-film-img-wrap">
       <img
          class="upcoming-film-img"
          src="${foto}"
          alt="Image of the upcoming film"
        />
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
              <p>${firstGenre}, ${secondGenre}</p>
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
          <button type="button" class="add-to-my-library">
            Add to my library
          </button>
        </div>
      </div>`;
  return markup;
}

function renderUpcomingFilm(markup) {
  if (markup === undefined) {
    return (refs.upcomingFilmEl.innerHTML = '');
  }
  return (refs.upcomingFilmEl.innerHTML = markup);
}

async function showUpcomingFilm() {
  const response = await getUpcomingFilm();
  const genres = await getGenres();
  const markup = createUpcomingFilmMarkup(response, genres);
  const rendering = renderUpcomingFilm(markup);
}

showUpcomingFilm();
