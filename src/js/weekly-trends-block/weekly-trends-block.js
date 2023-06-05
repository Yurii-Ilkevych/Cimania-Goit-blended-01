import Swiper from 'swiper';
import 'swiper/css';

import { populateMarkupWeeklyTrends } from './populateMarkupWeeklyTrends.js';
export const WEEKLY__KEY = '094e521ece6a91594bf23d7b90ab7858';
export const weeklyContainerEl = document.querySelector(
  '.weekly-trends-list__wrapper'
);
var swiper = new Swiper('.mySwiper', {
  slidesPerView: 3,
  spaceBetween: 15,
  mousewheel: {
    sensitivity: 1,
  },
  breakpoints: {
    768: {
      spaceBetween: 16,
      centeredSlides: false,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

populateMarkupWeeklyTrends();
