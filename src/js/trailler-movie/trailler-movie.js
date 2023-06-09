import axios from 'axios';
import { KEY } from '../API';

const modal = document.querySelector('[data-hero-modal]');
const playerContainer = document.getElementById('player-container');
const errorModal = document.querySelector('.hero-modal-message.error');
// открывает модальное окно или окно об ошибке
export async function openTrailerModal(movie) {
  const trailerKey = await getMovieTrailer(movie.id);
  if (trailerKey) {
    playerContainer.innerHTML = '';

    const player = document.createElement('iframe');
    player.src = `https://www.youtube.com/embed/${trailerKey}`;
    player.allowFullscreen = true;
    player.classList.add('player');
    playerContainer.appendChild(player);

    modal.classList.remove('hidden');

    const body = document.querySelector('html');
    body.classList.add('modal-trailer-open')
  } else {
    errorModal.classList.remove('hidden');
    modal.classList.remove('hidden');
  }
}
// закрывает модальное окно
export function closeTrailerModal() {
  modal.classList.add('hidden');
  playerContainer.innerHTML = '';
  errorModal.classList.add('hidden', 'is-hidden'); 
  const body = document.querySelector('html');
  body.classList.remove('modal-trailer-open');
}
// функциия для закрытия модалки через клавиатуру
export function handleTrailerModalKeyDown(event) {
  if (event.key === 'Escape') {
    closeTrailerModal();
  }
}
// пулчение ключа трейлера
async function getMovieTrailer(movieId) {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
      params: {
        api_key: KEY,
      },
    });

    const videos = response.data.results;
    const trailer = videos.find((video) => video.type === 'Trailer');

    if (trailer) {
      return trailer.key;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to get movie trailer:', error);
    return null;
  }
}
