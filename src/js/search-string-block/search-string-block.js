import axios from 'axios';
import { refsList } from '../list-movie-block/list-movie-block';
import { createMarkup } from '../list-movie-block/list-movie-block';
import { renderMarkup } from '../list-movie-block/list-movie-block';

const refs = {
    searchStringBlockForm: document.querySelector('.search-string-block-form'),
};

const API_KEY_V = '48b2bba5f96af80717b061a99685cb65';
let value = '';
let page = 1;

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGIyYmJhNWY5NmFmODA3MTdiMDYxYTk5Njg1Y2I2NSIsInN1YiI6IjY0NzlhNDgyY2Y0YjhiMDBlMmQ0ZmIwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RiB7cy2sepUia0enSXt_-ZtvZFAJrXAbSEnOnpP1tyo'
    }
};


document.addEventListener('DOMContentLoaded', onLoadTrends);

async function onLoadTrends() {
    try {
        const resp = await fetchTrends();
        const genres = await genreFetch();

        if (resp.length === 0) {
            refsList.listMovieBlockOops.textContent = 'Sorry, we did not find any movies.'
        }
        addDisplayNone();
        const markup = createMarkup(resp, genres);
        renderMarkup(markup);
    } catch (error ) {
        console.log(error);
    }
}



refs.searchStringBlockForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(e) {
    e.preventDefault();
    value = e.target[0].value.trim();
    onClearInput();

    refsList.listMovieBlockList.innerHTML = '';

    if(value === '') {
        refsList.listMovieBlockOops.textContent = 'You have not entered search text.';
    } 
    try {
        const genres = await genreFetch();
        const resp = await fetchFilmByValue(value);

        if (resp.length === 0) {
            removeDisplayNone();
        } else if (resp.length >= 1)
        addDisplayNone();
        const markup = createMarkup(resp, genres);
        renderMarkup(markup);
    } catch (error) {
        console.log(error);
    }
};

async function fetchTrends() {
    const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=${API_KEY_V}`,
    options
    );
    return response.data.results;
}

async function fetchFilmByValue(value) {
    const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=true&language=en-US&page=1&api_key=${API_KEY_V}`,
    options
    );
    return response.data.results;
}

export async function genreFetch() {
    const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY_V}`,
    options
    );
    const genres = response.data.genres;
    return genres;
}


function onClearInput() {
    refs.searchStringBlockForm.reset();
};

function removeDisplayNone() {
    refsList.listMovieBlockOops.classList.remove('display-none');
};

function addDisplayNone() {
    refsList.listMovieBlockOops.classList.add('display-none');
};



