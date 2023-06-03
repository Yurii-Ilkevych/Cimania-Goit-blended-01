const refs = {
  navMenuBtn: document.querySelector('.nav-menu-btn'),
  backdropEl: document.querySelector('.backdrop'),
  mobMenuEl: document.querySelector('.mobile-menu'),
  navLinksElems: document.querySelectorAll('.nav-link'),
  menuLinksElems: document.querySelectorAll('.mobile-menu-link'),
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
  refs.navLinksElems.forEach(link => { 
    if (link.getAttribute("href") === "." + window.location.pathname) { 
      link.classList.add("active");
    }
  });

  refs.menuLinksElems.forEach(link => { 
    if (link.getAttribute("href") === "." + window.location.pathname) { 
      link.classList.add("active");
    }
  });
}

console.log(window.location.pathname);

