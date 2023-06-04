const refs = {
  navMenuBtn: document.querySelector('.nav-menu-btn'),
  backdropEl: document.querySelector('.backdrop'),
  mobMenuEl: document.querySelector('.mobile-menu'),
  homeLinkEl: document.querySelectorAll('.home-link'),
  catalogLinkEl: document.querySelectorAll('.catalog-link'),
  libraryLinkEl: document.querySelectorAll('.library-link'),
};

refs.navMenuBtn.addEventListener('click', onMenuBtnClick);
refs.backdropEl.addEventListener('click', onBackdropClick);

addActiveClass();

function onMenuBtnClick(e) {
  mobileMenuToggle();
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('backdrop')) {
    return;
  }
  mobileMenuToggle();
}

function mobileMenuToggle() {
  refs.backdropEl.classList.toggle('is-hidden-header');
  refs.mobMenuEl.classList.toggle('shown');
}

function addActiveClass() {
  if (window.location.pathname.includes('index.html')) {
    refs.homeLinkEl.forEach(link => {
      link.classList.add('active');
    });
  } else if (window.location.pathname.includes('catalog.html')) {
    refs.catalogLinkEl.forEach(link => {
      link.classList.add('active');
    });
  } else if (window.location.pathname.includes('my-library.html')) {
    refs.libraryLinkEl.forEach(link => {
      link.classList.add('active');
    });
  }
}
