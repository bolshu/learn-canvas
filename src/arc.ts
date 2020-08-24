import Canvas from './canvas';

const canvas = new Canvas();
const { ctx } = canvas;

// Arc
function renderCircles() {
  for (let i = 0; i < 30; i += 1) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const r = Math.random() * 100 + 30;
    const color = Math.floor(Math.random() * 16777215).toString(16);

    ctx.lineWidth = 3;
    ctx.fillStyle = `#${color}`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

window.setInterval(() => {
  canvas.clear();
  renderCircles();
}, 300);
