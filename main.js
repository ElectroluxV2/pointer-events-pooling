const canvas = window.canvas;

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

const ctx = canvas.getContext('2d');
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

function drawDot(x, y, radius = 1, color = 'white') {
  ctx.beginPath(); // Start a new path
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2, color = 'white') {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.strokeWidth = 1;
  ctx.stroke();
}

let last = performance.now();
let x1 = [], y1 = [];
window.onpointermove = ev => {
  const now = performance.now();
  console.log(now - last);
  last = now;

  drawDot(ev.x, ev.y);

  x1[ev.pointerId] && drawLine(x1[ev.pointerId], y1[ev.pointerId], ev.x, ev.y);

  x1[ev.pointerId] = ev.x;
  y1[ev.pointerId] = ev.y;
}
