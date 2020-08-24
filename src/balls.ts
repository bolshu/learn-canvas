import Canvas from './canvas';

const canvas = new Canvas();
const { ctx } = canvas;

function getId(): number {
  return new Date().getTime() * (Math.random() / 2);
}

function getRandomHexColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getRandomRadius(): number {
  return Math.random() * 50;
}

function getRandomDynamic(): number {
  const rand = 2 - 0.5 + Math.random() * (6 - 2 + 1);
  const multiply = Math.random() > 0.5;

  return Math.round(rand) * (multiply ? -1 : 1);
}

function isReachedTheLimits(position: number, radius: number, limit: number): boolean {
  return (position + radius > limit) || (position - radius < 0);
}

function getStartCoordinates(): { x: number; y: number } {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

type Circle = {
  id: number;
  r: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
};

let circles: Circle[] = [{
  id: getId(),
  r: getRandomRadius(),
  x: getStartCoordinates().x,
  y: getStartCoordinates().y,
  dx: 2,
  dy: 2,
  color: getRandomHexColor(),
}];

function render(circle: Circle): void {
  const {
    x,
    y,
    r,
    color,
  } = circle;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fill();
}

function move(circle: Circle): void {
  const {
    id,
    x,
    dx,
    y,
    dy,
    r,
  } = circle;

  let result = { ...circle };

  if (isReachedTheLimits(x, r, window.innerWidth)) {
    result = {
      ...result,
      dx: -dx,
      color: getRandomHexColor(),
    };
  }

  if (isReachedTheLimits(y, r, window.innerHeight)) {
    result = {
      ...result,
      dy: -dy,
      color: getRandomHexColor(),
    };
  }

  result = {
    ...result,
    x: x + result.dx,
    y: y + result.dy,
  };

  circles = circles.map((it) => (
    it.id === id ? result : it
  ));
}

function animate(): void {
  window.requestAnimationFrame(animate);

  canvas.clear();

  circles.forEach((it) => {
    render(it);
    move(it);
  });
}

animate();

let count = 0;

window.setInterval(() => {
  if (count < 1000) {
    count += 1;

    const dynamic = getRandomDynamic();

    circles.push({
      id: getId(),
      r: getRandomRadius(),
      x: getStartCoordinates().x,
      y: getStartCoordinates().y,
      dx: dynamic,
      dy: dynamic,
      color: getRandomHexColor(),
    });
  }
}, 50);
