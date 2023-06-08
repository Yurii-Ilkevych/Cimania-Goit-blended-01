function makeRating(data) {
  return Math.round(data * 10);
}

// Makes rating for screen readers
function screenReaderRating(data) {
  return Math.round((data / 2) * 10) / 10;
}

export function createWeeklyCard(card) {
  const movieRating = makeRating(card.rating);
  const screenReaderMovieRating = screenReaderRating(card.rating);
  return `<div class="weekly-trends-list__item swiper-slide" data-filmId=${
    card.id
  }>
    <div class="weekly-trends-list__thumb">
      <div class="weekly-trends-list__bgc"></div>
        <img loading="lazy" src="${card.poster}" alt="${
    card.title + 'poster'
  }" class="weekly-trends-list__img">
        <div class="weekly-trends-list__description">
        <h3 class="weekly-trends-list__name">${card.title}</h3>
          <p class="weekly-trends-list__genres">${card.genres}</p>
          <p class="weekly-trends-list__year">${card.year}</p>
      </div>
      <p class="weekly-trends-list__rating" aria-label="${screenReaderMovieRating} stars out of 5" style="background: linear-gradient(
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
  </div>`;
}
