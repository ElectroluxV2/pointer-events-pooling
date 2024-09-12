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

const /** @type PointerEvent[] */ events = [];
window.onpointermove = ev => {
  events.push(...ev.getCoalescedEvents());
}

function draw() {
  while (events.length) {
   const ev =  events.pop();
    drawDot(ev.x, ev.y);
  }

  requestAnimationFrame(draw);
}

draw();
