import { openModal } from '../modal-window/modal-window'; // Igor
import { KEY__CATALOG } from '../search-string-block/search-string-block';

export const refsList = {
  listMovieBlockOops: document.querySelector('.list-movie-block-oops'),
  listMovieBlockList: document.querySelector('.list-movie-block-list'),
};

export function createMarkup(resp, genres) {
  //console.log(resp);
  return resp.reduce(
    (
      markup,
      { backdrop_path, poster_path
,         title, name, genre_ids, release_date, first_air_date, vote_average, id }
    ) => {

      let source = 'https://image.tmdb.org/t/p/original/';
      if (backdrop_path === null && poster_path === null) {
        source = '';
        backdrop_path = 'Coming-soon.png';
      } else if (backdrop_path === null) {
        backdrop_path = poster_path;
      } else if (poster_path === null) {
        backdrop_path;
      };

      release_date === undefined ? (release_date = first_air_date.slice(0, 4)) : (release_date = release_date.slice(0, 4));
      
      title === undefined ? (title = name.toUpperCase()) : (title = title.toUpperCase());

      const firstGenreToFind = genre_ids[0];
      const secondGenreToFind = genre_ids[1];
      const firstGenre = findGenre(firstGenreToFind, genres);
      const secondGenre = findGenre(secondGenreToFind, genres);

      const movieRating = rating(vote_average);
      const screenReaderMovieRating = ratingScreen(vote_average);
      // Igor - тег а
      return (
        markup +
        `<li class="list-movie-block-item" data-id="${id}">
            <div class="list-movie-block-thumb">
                <div class="list-movie-block-wrap"><img loading="lazy" class="list-movie-block-img" src="${source}${backdrop_path}" alt="${title}"></div>
                <div class="list-movie-block-info">
                    <div><h3 class="list-movie-block-title">${title}</h3>
                        <p class="list-movie-block-text">${firstGenre} ${secondGenre} | <span class="list-movie-block-span">${release_date}</span></p>
                    </div>
                </div>
                <p class="list-movie-block-rating" aria-label="${screenReaderMovieRating} stars out of 5" style="background: linear-gradient(
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
            </div>
         </li>`
      );
    },
    ''
  );
}

export async function renderMarkup(markup) {
  refsList.listMovieBlockList.innerHTML = '';
  refsList.listMovieBlockList.insertAdjacentHTML('beforeend', markup);
  const list = document.querySelector('.list-movie-block-list'); // Igor
  list.addEventListener('click', handleMoreDetailsClick); // Igor
}
// Igor
function handleMoreDetailsClick(event) {
  //   console.log('click on More details btn');
  const listItem = event.target.closest('.list-movie-block-item');
  if (listItem) {
    const movieId = listItem.getAttribute('data-id');
    // console.log(movieId);
    openModal(movieId, KEY__CATALOG);
  }
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

function rating(data) {
  return Math.round(data * 10);
}

function ratingScreen(data) {
  return Math.round((data / 2) * 10) / 10;
}
