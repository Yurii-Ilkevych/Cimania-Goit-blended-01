import { weeklyContainerEl } from './weekly-trends-block.js';
import { onClickFilmWeek } from './onClickFilmWeek.js';
import { createWeeklyCards } from './createWeeklyCards.js';
import { trendingWeekFetch, genreFetch, addTrendsSessionStorage } from './weekly-api.js';


export async function populateMarkupWeeklyTrends() {
  const trendingWeekly = trendingWeekFetch();
  const genre = genreFetch();
  const result = await Promise.all([trendingWeekly, genre]);
  const weeklyFilms = result[0].data.results;
  const genres = result[1].data.genres;
  createWeeklyCards(weeklyFilms, genres);
  addTrendsSessionStorage(weeklyFilms)
  
  weeklyContainerEl.addEventListener('click', onClickFilmWeek);
}