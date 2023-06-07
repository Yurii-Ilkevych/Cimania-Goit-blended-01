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

//  refs.homeLinkEl.forEach(link => {
//    link.classList.remove('active');
//  });
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
}

function mobileMenuToggle() {
  refs.backdropEl.classList.toggle('is-hidden-header');
  refs.mobMenuEl.classList.toggle('shown');
}

// function onThemeChange(e) {
//   if (refs.themeChangerEl.checked) {
//     document.body.setAttribute("light", "");
//     localStorage.setItem("ui-theme", "light");
//   } else { 
//     document.body.removeAttribute("light");
//     localStorage.removeItem("ui-theme");
//   }
// }

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
  if (localStorage.getItem("ui-theme") === "light") { 
    document.documentElement.setAttribute('light', '');
    refs.themeChangerEl.checked = true;
  }
} 

function addActiveClass() {
  console.log(window.location.pathname.includes('index.html'))
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
  } else if (!window.location.pathname.includes('index.html')){
    refs.homeLinkEl.forEach(link => {
      link.classList.add('active');
    });
  }
}
