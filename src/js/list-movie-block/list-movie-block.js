export const refsList = {
    listMovieBlockOops: document.querySelector('.list-movie-block-oops'),
    listMovieBlockList: document.querySelector('.list-movie-block-list'), 
};

export function createMarkup(resp) {
    return resp.reduce(
    (
        markup,
        { backdrop_path, title, genre_ids, release_date, vote_average, }
    ) => {
        // console.log((1971+(Date.parse(release_date)/31536000000)).toFixed(0));
        return (
        markup +
        `<li class="list-movie-block-item">
        <a class="list-movie-block-link" href="./">
            <div class="list-movie-block-thumb">
                <div class="list-movie-block-wrap"><img class="list-movie-block-img" src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="${title}"></div>
                <div class="list-movie-block-info">
                    <div><h3 class="list-movie-block-title">${title}</h3>
                        <p class="list-movie-block-text">Drama Action | <span class="list-movie-block-span">2023</span></p>
                    </div>
                </div>
            </div>
        </a>
    </li>`
            );
    }, '' );
};


export function renderMarkup(markup) { 
    refsList.listMovieBlockList.insertAdjacentHTML("beforeend", markup);
};