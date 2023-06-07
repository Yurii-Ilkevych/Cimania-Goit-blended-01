export const refsList = {
    listMovieBlockOops: document.querySelector('.list-movie-block-oops'),
    listMovieBlockList: document.querySelector('.list-movie-block-list'), 
};

export function createMarkup(resp, genres) {
    return resp.reduce(
    (
        markup,
        { backdrop_path, title, genre_ids, release_date, vote_average, }
    ) => {
        backdrop_path === null ? backdrop_path = '/rmmKVswMSMJfBxPAe4rn5jN2Tb0.jpg' : backdrop_path;
        release_date !== undefined ? release_date = release_date.split('').slice(0, 4).join('') : release_date = 'No date';
        title === undefined ? title = 'NO NAME' : title = title.toUpperCase();

        const firstGenreToFind = genre_ids[0];
        const secondGenreToFind = genre_ids[1];
        const firstGenre = findGenre(firstGenreToFind, genres);
        const secondGenre = findGenre(secondGenreToFind, genres);
        
        const movieRating = rating(vote_average);
        const screenReaderMovieRating = ratingScreen(vote_average);
        
        return (
        markup +
        `<li class="list-movie-block-item">
        <a class="list-movie-block-link" href="./">
            <div class="list-movie-block-thumb">
                <div class="list-movie-block-wrap"><img class="list-movie-block-img" src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="${title}"></div>
                <div class="list-movie-block-info">
                    <div><h3 class="list-movie-block-title">${title}</h3>
                        <p class="list-movie-block-text">${firstGenre} ${secondGenre} | <span class="list-movie-block-span">${release_date}</span></p>
                    </div>
                </div>
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
        </a>
    </li>`
            );
    }, '' );
};


export function renderMarkup(markup) { 
    refsList.listMovieBlockList.insertAdjacentHTML("beforeend", markup);
};

function findGenre(genre, arr) {
    let genreName = '';
    const xxx = arr.map(el => {
    if (el.id === genre) {
        genreName = el.name;
    }
    });
    return genreName;
}

function rating(data) {
    return Math.round(data * 10);
}

function ratingScreen(data) {
    return Math.round((data / 2) * 10) / 10;
}