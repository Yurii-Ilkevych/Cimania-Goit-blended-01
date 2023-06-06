const gallery = document.querySelector('.library-gallery');

export function addMarkupInLibrary(markupPoster) {
  gallery.innerHTML = markupPoster;
}
