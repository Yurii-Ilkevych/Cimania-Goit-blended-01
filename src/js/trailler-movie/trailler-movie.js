import axios from 'axios';
import { KEY } from '../API';

const modal = document.querySelector('[data-hero-modal]');
const playerContainer = document.getElementById('player-container');
const errorModal = document.querySelector('.hero-modal-message.error');
const backdropTrailer = document.querySelector('.backdrop-trailer');

export async function openTrailerModal(movie) {
  const trailerKey = await getMovieTrailer(movie.id);
  if (trailerKey) {
    playerContainer.innerHTML = '';

    const player = document.createElement('iframe');
    player.src = `https://www.youtube.com/embed/${trailerKey}`;
    player.allowFullscreen = true;
    player.classList.add('player');
    playerContainer.appendChild(player);
    backdropTrailer.addEventListener("click", handleTrailerModalKeyDown);
    modal.classList.remove('hidden');

    const body = document.querySelector('html');
    body.classList.add('modal-trailer-open');
  } else {
    errorModal.classList.remove('hidden');
    modal.classList.remove('hidden');
  }
}

export function closeTrailerModal() {
  modal.classList.add('hidden');
  playerContainer.innerHTML = '';
  backdropTrailer.removeEventListener("click", handleTrailerModalKeyDown);
  errorModal.classList.add('hidden');
  const body = document.querySelector('html');
  body.classList.remove('modal-trailer-open');
}

export function handleTrailerModalKeyDown(event) {
  if (event.key === 'Escape' || event.currentTarget === event.target) {
    closeTrailerModal();
  }
}

async function getMovieTrailer(movieId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        params: {
          api_key: KEY,
        },
      }
    );

    const videos = response.data.results;
    const trailer = videos.find(video => video.type === 'Trailer');

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
