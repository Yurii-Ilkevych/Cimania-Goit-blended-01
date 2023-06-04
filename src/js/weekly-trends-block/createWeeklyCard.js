export function createWeeklyCard(card) {
    return `<div class="weekly-trends-list__item swiper-slide" data-filmId=${card.id}>
    <div class="weekly-trends-list__thumb">
        <img src="${card.poster}" alt="${
      card.title + 'poster'
    }" class="weekly-trends-list__img">
        <div class="weekly-trends-list__description">
        <h3 class="weekly-trends-list__name">${card.title}</h3>
          <p class="weekly-trends-list__genres">${card.genres}</p>
          <p class="weekly-trends-list__year">${card.year}</p>
      </div>
      <div class="weekly-trends-list__rating">${card.rating}</div>
      <ul class="weekly-trends-list__rating rating">
      <li><div class="wtf"></div></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
  
      </ul>
    </div>
  </div>`;
  }
  