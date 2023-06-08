import {openModal} from '../modal-window/modal-window.js'
import { KEY__TREND } from './weekly-trends-block.js';

export function onClickFilmWeek(e) {
  const clickFilm = e.target.closest('.weekly-trends-list__item');
  const idFilm = clickFilm.dataset.filmid;
  openModal(idFilm, KEY__TREND)
}