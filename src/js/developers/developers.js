const refs = {
  devModal: document.querySelector('[data-dev]'),
  backdropFtrEl: document.querySelector('.backdrop-developers'),
  openModalBtn: document.querySelector('[data-dev-open]'),
  closeModalBtn: document.querySelector('[data-dev-close]'),
};

// overflow hidden

const onOpenModal = evt => {
  evt.preventDefault();
  refs.devModal.classList.remove('hidden');
  window.addEventListener('keydown', onEscKeyPress);

  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;

  body.classList.add('dev-open');

  body.style.position = 'fixed';
  body.style.left = '0px';
  body.style.right = '0px';
  body.style.top = `-${scrollY}`;
};

const onCloseModal = () => {
  const body = document.body;

  body.classList.remove('dev-open');
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);

  refs.devModal.classList.add('hidden');
};

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty(
    '--scroll-y',
    `${window.scrollY}px`
  );
});

// On Escape Press

const onEscKeyPress = evt => {
  const isEscKey = evt.code === 'Escape';
  if (isEscKey) {
    onCloseModal();
  }
  window.removeEventListener('keydown', onEscKeyPress);
};

// On Overlay Click

const onOverlayClick = evt => {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdropFtrEl.addEventListener('click', onOverlayClick);
