const $logo = document.querySelector('[data-logo]');

window.addEventListener('scroll', (e) => {
  const progress = window.scrollY / window.innerHeight;
  const progressMax = Math.min(progress, 1);
  $logo.style.transform = `translate(-50%, calc(-50% - ${progress * 40}rem)) scale(${1.4 + progress}) rotate(${-35 * progress}deg)`;
});
