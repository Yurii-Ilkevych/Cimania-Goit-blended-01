import Swiper from 'swiper';
import 'swiper/css';

import { populateMarkupWeeklyTrends } from './populateMarkupWeeklyTrends.js';
export const WEEKLY__KEY = '094e521ece6a91594bf23d7b90ab7858';
export const KEY__TREND = 'trend-weekly-key';

export const weeklyContainerEl = document.querySelector(
  '.weekly-trends-list__wrapper'
);
var swiper = new Swiper('.mySwiper', {
  mousewheel: {
    sensitivity: 1,
  },
  breakpoints: {
    1280: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
      centeredSlides: false,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

populateMarkupWeeklyTrends();