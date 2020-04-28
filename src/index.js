const $logo = document.querySelector('[data-logo]');
const $logoWrap = document.querySelector('.logo');
const $clock = document.querySelector('[data-clock]');

const scroller = () => {
  const progress = window.scrollY / window.innerHeight;
  const progressMax = Math.min(progress, 1);
  $logo.style.transform = `translate(-50%, calc(-50% - ${progressMax * 40}rem)) scale(${0.4 + (progressMax * .6)}) rotate(${-35 * progress}deg)`;

  $logoWrap.style.setProperty('--top', progress * 13 + 'vmax');
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

window.addEventListener('scroll', (e) => {
  requestAnimationFrame(scroller);
});

setInterval(setTimeVars, 1000);
setTimeVars();
