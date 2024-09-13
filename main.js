const canvas = window.canvas;

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

const ctx = canvas.getContext('2d', {
  alpha: false,
  desynchronized: true,
  willreadfrequently: true,
});

ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

function drawDot(x, y, radius = 10, color = 'white') {
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
const /** @type PointerEvent[] */ predictions = [];
window.onpointermove = ev => {
  events.push(...ev.getCoalescedEvents());
  const pred = ev.getPredictedEvents();
  pred.length && predictions.push(ev.getPredictedEvents()[0]);
  // console.log(ev.getPredictedEvents())
}

function draw() {
  events.length && ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!predictions.length && events.length) {
    const ev =  events.pop();
    drawDot(ev.x, ev.y);
    events.length = 0;
  } else if (predictions.length) {
    while (predictions.length) {
      const ev =  predictions.pop();
      drawDot(ev.x, ev.y, 10, "red");
    }
  }

  requestAnimationFrame(draw);
}

draw();
