import axios from 'axios';
import { KEY } from '../API';

const modal = document.querySelector('[data-hero-modal]');
const playerContainer = document.getElementById('player-container');
const errorModal = document.querySelector('.hero-modal-message.error');

export async function openTrailerModal(movie) {
  const trailerKey = await getMovieTrailer(movie.id);
  if (trailerKey) {
    playerContainer.innerHTML = '';

    const player = document.createElement('iframe');
    player.src = `https://www.youtube.com/embed/${trailerKey}`;
    player.allowFullscreen = true;
    player.classList.add('player');
    playerContainer.appendChild(player);

    modal.classList.remove('is-hidden');
  } else {
    errorModal.classList.remove('is-hidden');
    modal.classList.remove('is-hidden');
  }
}

export function closeTrailerModal() {
  modal.classList.add('is-hidden');
  playerContainer.innerHTML = '';
  errorModal.classList.add('is-hidden');
}

export function handleTrailerModalKeyDown(event) {
  if (event.key === 'Escape') {
    closeTrailerModal();
  }
}

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
