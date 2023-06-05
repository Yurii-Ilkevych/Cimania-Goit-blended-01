import Swiper from 'swiper';
import 'swiper/css';

import { populateMarkupWeeklyTrends } from './populateMarkupWeeklyTrends.js';
export const WEEKLY__KEY = '094e521ece6a91594bf23d7b90ab7858';
export const weeklyContainerEl = document.querySelector(
  '.weekly-trends-list__wrapper'
);
var swiper = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  mousewheel: {
    sensitivity: 1,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
      centeredSlides: false,
    },
    1280: {
      spaceBetween: 15,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

 populateMarkupWeeklyTrends();



