import axios from 'axios';
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWI4YTU2N2U4NTIwYjJkOTYxNmQyYjU1NGY1MGI4MyIsInN1YiI6IjY0Nzg5MDY0MDc2Y2U4MDEwNzliOGMxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2ia6cdeIOjpNaTQl8aCiS1rstAtEfICJgybU1GCz5mQ',
  },
};
export const getImg = poster => {
    if(poster){
        return `https://image.tmdb.org/t/p/w500/${poster}`;
    }
return 'Coming-soon.png'
};
export const getTittle = movie => {
  if (movie.title) {
    return movie.title;
  } else if (movie.name) {
    return movie.name;
  }
  return 'No Tittle';
};
export const getRating = rating => {
  if (rating) {
    return rating.toFixed(1);
  }
  return 0;
};
export const getVotes = votes => {
  if (votes) {
    return votes;
  }
  return 0;
};
export const getPopularity = popularity => {
  if (popularity) {
    return popularity;
  }
  return 0;
};
export const getGanre = async id => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    if (response.status === 200) {
      return `${response.data.genres[0].name}, ${response.data.genres[1].name}`;
    } else {
        throw new Error('Not genre');
    }
  } catch (error) {
    return 'Not genre';
  }
};
export const getOverview = overview => {
  if (overview) {
    return overview;
  }
  return 'Not description';
};
export const getDate = ({release_date, first_air_date})=>{
    if(release_date){
    return (release_date.split("").slice(0,4)).join("")
    }else if(first_air_date){
      return (first_air_date.split("").slice(0,4)).join("")
    }
    return "No date"
    }