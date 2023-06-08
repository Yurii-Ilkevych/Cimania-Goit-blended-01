import axios from 'axios';

export function createMarkupMyLibrary(arrayFilmsFromLocale) {
  return arrayFilmsFromLocale.reduce((markupPost, objCard) => {
    const year = getDate(objCard.release_date);
    const genre = getGanre(objCard.genre);
    const movieRating = rating(objCard.rating);
    const screenReaderMovieRating = ratingScreen(objCard.rating);
    return (
      markupPost +
      `<li id="${objCard.movieID}"><div class="card-poster">
			<img loading="lazy" src="https://image.tmdb.org/t/p/original/${objCard.posterPath}" 
			width="280px" alt="${objCard.overview}" />
	<div class="poster-info"><h3 class="title-poster">${objCard.movieTitle}</h3>
	<p class="info-about-post">${[...genre]} | <span>${year}</span></p></div>

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
  }, '');

  function rating(data) {
    return Math.round(data * 10);
  }

  function ratingScreen(data) {
    return Math.round((data / 2) * 10) / 10;
  }

  function getGanre(genre) {
    if (genre) {
      return genre.split(' ').slice(0, 2);
    }
    return ['No genre'];
  }

  function getDate(data) {
    if (data) {
      return data.slice(0, 4);
    }
    return 'No date';
  }
}
