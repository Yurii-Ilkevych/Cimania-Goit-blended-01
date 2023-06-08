import axios from 'axios';
import { WEEKLY__KEY, KEY__TREND } from './weekly-trends-block.js';

export async function genreFetch() {
  return await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${WEEKLY__KEY}`
  );
}

export async function trendingWeekFetch() {
  return await axios.get(
   `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${WEEKLY__KEY}`
  );
}

export function addTrendsSessionStorage(list) {
  const strList = JSON.stringify(list);
  sessionStorage.setItem(KEY__TREND, strList);
}