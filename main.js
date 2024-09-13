const canvas = window.canvas;

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

const ctx = canvas.getContext('2d', {
  alpha: false,
  desynchronized: true,
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

const /** @type {Map<PointerEvent["pointerId"],PointerEvent[]>} */ pointerCoalescedEventsByPointer = new Map();
const /** @type {Map<PointerEvent["pointerId"],PointerEvent[]>} */ pointerPredictedEventsByPointer = new Map();
window.onpointermove = pointerEvent => {
  const { pointerId } = pointerEvent;

  !pointerCoalescedEventsByPointer.has(pointerId) && pointerCoalescedEventsByPointer.set(pointerId, []);
  !pointerPredictedEventsByPointer.has(pointerId) && pointerPredictedEventsByPointer.set(pointerId, []);

  pointerCoalescedEventsByPointer.set(pointerId, pointerCoalescedEventsByPointer.get(pointerId).concat(pointerEvent.getCoalescedEvents()));
  pointerPredictedEventsByPointer.set(pointerId, pointerPredictedEventsByPointer.get(pointerId).concat(pointerEvent.getPredictedEvents()));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'white';

  for (const pointerId of pointerCoalescedEventsByPointer.keys()) {
    const coalescedEvents = pointerCoalescedEventsByPointer.get(pointerId);

    // At least 2 points to draw line
    if (coalescedEvents.length < 2) continue;

    const first = coalescedEvents.at(0);
    const last = coalescedEvents.at(-1);

    ctx.beginPath();
    ctx.moveTo(first.x, first.y);

    // Points between start and stop
    for (let i = 1; i < coalescedEvents.length - 1; i++) {
      ctx.lineTo(coalescedEvents[i].x, coalescedEvents[i].y);
    }

    ctx.lineTo(last.x, last.y);


    const predictedEvents = pointerPredictedEventsByPointer.get(pointerId);

    // At least 1 predicted point to draw prediction
    if (predictedEvents.length < 1) {
      ctx.stroke();
      continue;
    }

    for (const predictedEvent of predictedEvents) {
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(predictedEvent.x, predictedEvent.y);
    }

    ctx.stroke();
    // Clean predictions
    pointerPredictedEventsByPointer.set(pointerId, []);
  }

  requestAnimationFrame(draw);
}

draw();
