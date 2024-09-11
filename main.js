const canvas = window.canvas;

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

const ctx = canvas.getContext('2d');
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

function drawDot(x, y, radius = 5, color = 'white') {
  ctx.beginPath(); // Start a new path
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

let last = performance.now();
window.onpointerrawupdate = ev => {
  const now = performance.now();
  console.log(now - last);
  last = now;

  drawDot(ev.x, ev.y, 1);
}
