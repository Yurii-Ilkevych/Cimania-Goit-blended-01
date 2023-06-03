const refs = {
  navMenuBtn: document.querySelector('.nav-menu-btn'),
  backdropEl: document.querySelector('.backdrop'),
  mobMenuEl: document.querySelector('.mobile-menu'),
  navLinksElems: document.querySelectorAll('.nav-link'),
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
  refs.backdropEl.classList.toggle('is-hidden');
  refs.mobMenuEl.classList.toggle('shown');
}

function addActiveClass() {
  refs.navLinksElems.forEach(link => { 
    if (link.getAttribute("href") === "." + window.location.pathname) { 
      link.classList.add("active");
    }
  });
}

