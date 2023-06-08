const refs = {
  navMenuBtn: document.querySelector('.nav-menu-btn'),
  backdropEl: document.querySelector('.mobile-menu-backdrop'),
  mobMenuEl: document.querySelector('.mobile-menu'),
  logoTextEl: document.querySelector('.logo-text'),
  homeLinkEl: document.querySelectorAll('.home-link'),
  catalogLinkEl: document.querySelectorAll('.catalog-link'),
  libraryLinkEl: document.querySelectorAll('.library-link'),
  themeChangerEl: document.getElementById('theme-changer'),
};

refs.navMenuBtn.addEventListener('click', onMenuBtnClick);
refs.backdropEl.addEventListener('click', onBackdropClick);
refs.themeChangerEl.addEventListener('change', onThemeChange);

addActiveClass();
themeSetup();

function onMenuBtnClick(e) {
  mobileMenuToggle();
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('mobile-menu-backdrop')) {
    return;
  }
  mobileMenuToggle();
  document.body.classList.remove('mobile-menu-open');
}

function mobileMenuToggle() {
  refs.mobMenuEl.classList.toggle('shown');
  refs.backdropEl.classList.toggle('is-hidden-header');
  document.body.classList.add('mobile-menu-open');
}

function onThemeChange(e) {
  if (refs.themeChangerEl.checked) {
    document.documentElement.setAttribute('light', '');
    localStorage.setItem('ui-theme', 'light');
  } else {
    document.documentElement.removeAttribute('light');
    localStorage.removeItem('ui-theme');
  }
}

function themeSetup() {
  if (localStorage.getItem('ui-theme') === 'light') {
    refs.themeChangerEl.checked = true;
  }
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
  } else if (!window.location.pathname.includes('index.html')) {
    refs.homeLinkEl.forEach(link => {
      link.classList.add('active');
    });
  }
}
