// import axios from 'axios';
// import { KEY } from '../API';



// export async function openModal(movie, playerContainer) {
//   const trailerKey = await getMovieTrailer(movie.id);
//   if (trailerKey) {
//     // Очищаем содержимое контейнера перед созданием плеера
//     playerContainer.innerHTML = '';

//     // Создаем свой плеер для вставки трейлера
//     const player = document.createElement('iframe');
//     player.src = `https://www.youtube.com/embed/${trailerKey}`;
//     player.allowFullscreen = true;
//     player.width = '560';
//     player.height = '315';
//     playerContainer.appendChild(player);

//     // Показываем модальное окно
//     modal.classList.remove('is-hidden');
//   } else {
//     // Показываем модальное окно с ошибкой
//     errorModal.classList.remove('is-hidden');
//     modal.classList.remove('is-hidden');
//   }
// }

// export function closeModal() {
//   // Скрываем модальное окно
//   modal.classList.add('is-hidden');

//   // Очищаем плеер
//   playerContainer.innerHTML = '';

//   // Скрываем модальное окно с ошибкой
//   errorModal.classList.add('is-hidden');
// }
// // ...
// // Запрос трейлера фильма по его идентификатору
// export async function getMovieTrailer(movieId) {
//   try {
//     const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
//       params: {
//         api_key: KEY,
//       },
//     });

//     const videos = response.data.results;
//     const trailer = videos.find((video) => video.type === 'Trailer');

//     if (trailer) {
//       return trailer.key;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Failed to get movie trailer:', error);
//     return null;
//   }
// }