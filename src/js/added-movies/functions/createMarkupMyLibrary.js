import {
  getImg,
  getTittle,
  getRating,
  getVotes,
  getDate
} from '../../request-processing';

export function createMarkupMyLibrary(arrayFilmsFromLocale) {
 
  return arrayFilmsFromLocale.reduce((markupPost, movie) => {
    return (
      markupPost +
      `<li id="${movie.id}"><div class="card-poster">
			<img loading="lazy" src="https://image.tmdb.org/t/p/original/${getImg(movie.poster_path)}" 
			width="280px" alt="${getTittle(movie)}" />
	<div class="poster-info"><h3 class="title-poster">${getTittle(movie)}</h3>
	<p class="info-about-post">${movie.genres} | <span>${getDate(movie)}</span></p></div>

  <p class="list-movie-block-rating" aria-label="${getVotes(movie.vote_count)} stars out of 5" style="background: linear-gradient(
    to right,
    var(--color-orange),
    var(--color-orange),
    ${getRating(movie.vote_average)*10}%,
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
}
