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

const $video = document.querySelector('.video__element');

console.log($video.duration)
$video.addEventListener('play', () => {
  setTimeout(() => {
    document.querySelector('.video-running').classList.remove('video-running');
  }, 9000 - 500);
});

//setInterval(setTimeVars, 1000); // now handled in CSS only
setTimeVars();
setTimeout(setTimeVars, 1000); //because some time the DOM ist just nor ready yet ;)

scroller();

console.log('https://github.com/meodai/elastiq/');
