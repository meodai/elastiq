import anime from 'animejs/lib/anime.es.js';

const map = (value, low1, high1, low2, high2) =>
  low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
const originalPath = `M228.45 202.41c25.89-7.67 59 2.55 80.49-31.66 25.23-40.1 60.94-44.68 85.27-31.62 34.2 18.36 31.67 68.27 7.58 90.7-27.42 25.53-29.58 52.91-13.68 67.24 22.95 20.68 47.1-2.67 35.85-19.93-8.94-13.73-31.93-25.89-98.1 6.9-65.32 32.36-129.62 19-133.91-32.42-1.03-12.53 2.88-39.25 36.5-49.21z`;
const rndPath = () => {
  const y1 = map(Math.random(), 0, 1, 70, 300);
  const x2 = map(Math.random(), 0, 1, 180, 350);
  return Math.random() < 0.2
    ? originalPath
    : `M 310 300 ` +
      `S 290 269 281 221 ` +
      `S 349 ${y1} 253 ${y1} ` +
      `S ${x2 + 50} 201 ${x2} 299 ` +
      `S 399 448 310 300 z`;
};

const $logo = document.querySelector('[data-logo]');
const $clock = document.querySelector('[data-clock]');
let isScrolling = false;

const scroller = () => {
  const progress = window.scrollY / window.innerHeight;
  const progressMax = Math.min(progress, 1);

  $logo.style.setProperty('--progress', progress);
  $logo.style.setProperty('--progressMax', progressMax);
  $logo.style.setProperty('--top', progress * 13 + 'vmax');
  isScrolling = false;
};

const setTimeVars = () => {
  const now = new Date();
  const timeInMilliseconds = now.getTime() - now.getTimezoneOffset() * 60000;
  const minuteProgress = (timeInMilliseconds / 1000 / 60) % 60;
  const hourProgress = (timeInMilliseconds / 1000 / 60 / 60) % 24;
  const dayProgress = now.getHours() / 24 * 2;

  $clock.style.setProperty('--minute-progress', minuteProgress);
  $clock.style.setProperty('--hour-progress', hourProgress);
  $clock.style.setProperty('--day-progress', dayProgress);
};


window.addEventListener('scroll', () => {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(scroller);
  }
}, {
  capture: true,
  passive: true,
});

//setInterval(setTimeVars, 1000); // now handled in CSS only
setTimeVars();
setTimeout(setTimeVars, 1000); //because some time the DOM ist just nor ready yet ;)

scroller();

document.addEventListener(
  'click',
  () => {
    const r = map(Math.random(), 0, 1, 0, 360);

    anime({
      targets: ".elastiq",
      d: rndPath,
      duration: 200,
      rotate: r,
      easing: "easeInElastic(1, .5)",
      transformOrigin: `${613 * 0.5}px ${433 * 0.5}px 0`,
    });
  },
  true
);

console.log('https://github.com/meodai/elastiq/');
