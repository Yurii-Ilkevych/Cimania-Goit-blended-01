const imgBlock = document.querySelector('.container-img');
const movieBlock = document.querySelector('.container-item-render');


export function renderMovie(movie){
    const murcupImg = `<img loading="lazy" class="img-pop-modal" src="${getImg(movie.poster_path)}" alt="film" />`;
    const getMovie = `<h2 class="name-film-pop-modal">${getTittle(movie)}</h2>
      <div class="vote-votes-pop-modal-container">
        <p class="vote-votes-pop-modal-text">Vote / Votes</p>
        <div class="vote-data-container-pop-modal">
          <span class="vote-data-pop-modal">${getRating(movie.vote_average)}</span>
        </div>
        <div class="devider-data-pop-modal">/</div>
        <div class="votes-data-container-pop-modal">
          <span class="votes-data-pop-modal">${getvVotes(movie.vote_count)}</span>
        </div>
      </div>
      <div class="popularity-pop-modal-container">
        <p class="popularity-pop-modal-text">Popularity</p>
        <div class="popularity-data-pop-modal">${getPopularity(movie.popularity)}</div>
      </div>
      <div class="gerne-pop-modal-container">
        <p class="gerne-pop-modal-text">Genre</p>
        <div class="gerne-data-pop-modal">${getGanre(movie.genre_ids)}</div>
      </div>
      <h2 class="about-pop-modal-text">About</h2>
      <div class="about-pop-modal-description">
        ${getOverview(movie.overview)}
      </div>`;
    imgBlock.innerHTML = murcupImg;
    movieBlock.innerHTML = getMovie;
}
const getImg=(poster)=>{
    return `https://image.tmdb.org/t/p/w500/${poster}`
}
const getTittle=(movie)=>{
    if(movie.title){
        return movie.title
    }else if(movie.name){
        return movie.name
    }
    return "No Tittle"
}
const getRating=(rating)=>{
if(rating){
    return rating.toFixed(1)
}
return 0
}
const getvVotes=(votes)=>{
if(votes){
 return  votes
}
return 0
}
const getPopularity=(popularity)=>{
if(popularity){
    return popularity
}
return 0
}
const getGanre=(genre)=>{
if(genre){
    return [...genre]
}
return "Not genre"
}
const getOverview=(overview)=>{
    if(overview){
        return overview
    }
    return "Not description"
}