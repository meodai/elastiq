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

  const minuteProgress = now.getSeconds() + now.getMilliseconds() / 1000;
  const hourProgress = (now.getMinutes() + minuteProgress / 60) / 60;
  const dayProgress = (now.getHours() + hourProgress) / 24 * 2;

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
setTimeout(setTimeVars, 1000); //because sometimes the DOM ist just nor ready yet ;)

scroller();

console.log('https://github.com/meodai/elastiq/');
