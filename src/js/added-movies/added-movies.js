import axios from 'axios';
import { KEY } from '../API';

const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const url2 = 'https://api.themoviedb.org/3/genre/movie/list';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWRjYTZiOTk2ZDY4YzcwYzVhY2Q2ZTg5ZmEwZDgyNSIsInN1YiI6IjY0N2NkMjBiMjYzNDYyMDBmOTI5NWRkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3hG3mma-Lf_TxF0tRVboK7xVA16kPp-JXhfXHs-s6Eo',
  },
};

async function getDataToLibrary() {
  const dataFilm = await axios.get(url2, options);
  return dataFilm;
}

showData();
async function showData() {
  const a = await getDataToLibrary();
  const genre = a.data.genres;
  console.log('MyData', genre);
  genre.map(obj => console.log(obj.name));
}
