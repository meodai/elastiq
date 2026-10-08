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

// Firefox re-rasterizes an SVG at every scale change, so the band is
// painted once into a canvas and the compositor scales the bitmap.
// The canvas inherits the SVG's class, and with it the scroll transform.
const BOX = { x: -6, y: -6, w: 250, h: 187 }; // viewBox padded by half a stroke
const MAX_PX = 4096; // caps the bitmap at ~50MB, slightly soft at 2x on wide screens

const swapLogoForCanvas = () => {
  const $svg = $logo.querySelector('svg');
  const $path = $svg.querySelector('path');
  const $canvas = document.createElement('canvas');
  const ctx = $canvas.getContext('2d');
  const shape = new Path2D($path.getAttribute('d'));
  const { stroke, strokeWidth } = getComputedStyle($path);
  let painted = '';

  $canvas.className = $svg.getAttribute('class');
  // widen by the padding so the shape matches the SVG's size
  $canvas.style.width = 231 * BOX.w / 238 + '%';
  $svg.replaceWith($canvas);

  const paint = () => {
    const cssWidth = $canvas.clientWidth;
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PX / cssWidth);
    const key = cssWidth + ':' + ratio;
    if (key === painted) return; // height-only resizes (mobile URL bar)
    painted = key;

    $canvas.width = Math.round(cssWidth * ratio);
    $canvas.height = Math.round(cssWidth * ratio * BOX.h / BOX.w);

    const k = $canvas.width / BOX.w;
    ctx.setTransform(k, 0, 0, k, -BOX.x * k, -BOX.y * k);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = parseFloat(strokeWidth);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke(shape);
  };

  let frame;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(paint);
  }, { passive: true });
  paint();
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

swapLogoForCanvas();
scroller();

console.log('https://github.com/meodai/elastiq/');
