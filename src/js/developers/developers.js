const refs = {
  devModal: document.querySelector('[data-dev]'),
  backdropFtrEl: document.querySelector('.backdrop-developers'),
  openModalBtn: document.querySelector('[data-dev-open]'),
  closeModalBtn: document.querySelector('[data-dev-close]'),
};

// Open Modal

function onOpenModal(evt) {
  evt.preventDefault();

  document.body.classList.add('dev-open');
  refs.devModal.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
}

// Close Modal

function onCloseModal() {
  document.body.classList.remove('dev-open');
  refs.devModal.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscKeyPress);
}

// On Escape Press

function onEscKeyPress(evt) {
  const isEscKey = evt.code === 'Escape';
  if (isEscKey) {
    onCloseModal();
  }
}

// On Overlay Click

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdropFtrEl.addEventListener('click', onOverlayClick);
