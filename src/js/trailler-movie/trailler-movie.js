import axios from 'axios';
import { KEY } from '../API';

export async function openModal(movie) {
  const trailerKey = await getMovieTrailer(movie.id);
  if (trailerKey) {
    const playerContainer = document.getElementById('player-container');
    playerContainer.innerHTML = '';

    // Создаем свой плеер для вставки трейлера
    const player = document.createElement('iframe');
    player.src = `https://www.youtube.com/embed/${trailerKey}`;
    player.allowFullscreen = true;
    player.classList.add('player');
    playerContainer.appendChild(player);

    const openModalBtn = document.getElementById('hero-trailer-btn');
    const closeModalBtn = document.querySelector('[data-hero-modal-close]');
    const modal = document.querySelector('[data-hero-modal]');
    const errorModal = document.querySelector('.hero-modal-message.error');

    openModalBtn.addEventListener('click', () => openModal(movie), { passive: true });
    closeModalBtn.addEventListener('click', closeModal, { passive: true });

    modal.classList.remove('is-hidden');
  } else {
    const modal = document.querySelector('[data-hero-modal]');
    const errorModal = document.querySelector('.hero-modal-message.error');

    errorModal.classList.remove('is-hidden');
    modal.classList.remove('is-hidden');
  }
}

export function closeModal() {
  const modal = document.querySelector('[data-hero-modal]');
  const playerContainer = document.getElementById('player-container');
  const errorModal = document.querySelector('.hero-modal-message.error');

  modal.classList.add('is-hidden');
  playerContainer.innerHTML = '';
  errorModal.classList.add('is-hidden');

  const openModalBtn = document.getElementById('hero-trailer-btn');
  const closeModalBtn = document.querySelector('[data-hero-modal-close]');

  openModalBtn.removeEventListener('click', () => openModal(movie), { passive: true });
  closeModalBtn.removeEventListener('click', closeModal, { passive: true });
}

export async function getMovieTrailer(movieId) {
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
