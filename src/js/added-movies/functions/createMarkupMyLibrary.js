export function createMarkupMyLibrary(arrayFilmsFromLocale) {
  return arrayFilmsFromLocale.reduce((markupPost, objCard) => {
    return (
      markupPost +
      `<li><div class="card-poster">
	<img src="./img/img-mob.jpg" width="280px" alt="alt" />
	<div class="poster-info"><div><h3>${objCard.title}</h3><p class="info-about-post">genre | <span>2023</span></p></div></div></div></li>`
    );
  }, '');
}
