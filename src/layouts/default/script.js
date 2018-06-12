const ScrollTrigger = require('scrolltrigger-classes');

const throttle = require('throttle-debounce/throttle');
const debounce = require('throttle-debounce/debounce');


const $body = document.querySelector('body');
const $header = document.querySelector('.js-header');
const $homeSlideContainer = document.querySelector('.js-snapp-container');


throttle(300, function () {
  // Throttled function
});

debounce(300, function () {
  // Debounced function
});
