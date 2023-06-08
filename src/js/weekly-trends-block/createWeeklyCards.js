import { weeklyContainerEl } from './weekly-trends-block.js';
import { createWeeklyCard } from './createWeeklyCard.js';

export async function createWeeklyCards(films, genres) {
  const filmsEl = [];
  films.forEach(film => {
    const id = film.id;
    const year = film.release_date.slice(0, 4);
    const title = film.title;
    const genresId = film.genre_ids;
    const rating = film.vote_average;
    const poster = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
    const genresList = [];
    genres.forEach(element => {
      if (genresId.includes(element.id) && genresList.length < 2) {
        const lengthGenres = genresList.join('').length;
        const sumLength = lengthGenres + element.name.length;
        if (sumLength < 15) {
          genresList.push(element.name);
        }
      }
    });
    const card = createWeeklyCard({
      genres: genresList.join(','),
      year,
      title,
      rating,
      poster,
      id,
    });
    filmsEl.push(card);
  });
  weeklyContainerEl.insertAdjacentHTML('beforeend', filmsEl.join(' '));
}