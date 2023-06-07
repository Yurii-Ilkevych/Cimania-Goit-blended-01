export function createMarkupMyLibrary(arrayFilmsFromLocale) {
  return arrayFilmsFromLocale.reduce((markupPost, objCard) => {
    return (
      markupPost +
      `<li id="${objCard.movieID}"><div  class="card-poster">
	<img src="https://image.tmdb.org/t/p/original/${objCard.posterPath}" width="280px" alt="${objCard.overview}" />
	<div class="poster-info"><h3 class="title-poster">${objCard.movieTitle}</h3><p class="info-about-post">${objCard.genre} | <span>Year</span></p></div></div></li>`
    );
  }, '');
}
// данные карточки

//  const movieObject = {
//    movieID,
//    posterPath,
//    movieTitle,
//    rating,
//    votes,
//    popularity,
//    genre,
//    overview,
//  };
