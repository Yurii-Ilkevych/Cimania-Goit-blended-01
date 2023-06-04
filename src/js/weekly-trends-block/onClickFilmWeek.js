export function onClickFilmWeek(e) {
  const clickFilm = e.target.closest('.weekly-trends-list__item');
  console.log(clickFilm.dataset.filmid);
  return clickFilm.dataset.filmid;
}
