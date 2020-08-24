import Canvas from './canvas';

const canvas = new Canvas();
const { ctx } = canvas;

class Ball {
  private ctx: CanvasRenderingContext2D;

  private r: number;

  private x: number;

  private y: number;

  private dx: number;

  private dy: number;

  private color: string;

  constructor(context: CanvasRenderingContext2D) {
    this.r = Ball.getRandomRadius();
    this.x = this.getStartCoordinates().x;
    this.y = this.getStartCoordinates().y;
    this.dx = Ball.getRandomDynamic();
    this.dy = Ball.getRandomDynamic();
    this.color = Ball.getRandomHexColor();
    this.ctx = context;
  }

  public update(): void {
    if (this.isReachedTheLimits(this.x, window.innerWidth)) {
      this.dx = -this.dx;
      this.color = Ball.getRandomHexColor();
    }

    if (this.isReachedTheLimits(this.y, window.innerHeight)) {
      this.dy = -this.dy;
      this.color = Ball.getRandomHexColor();
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  private draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.ctx.fill();
  }

  private static getRandomHexColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  private static getRandomRadius(): number {
    return Math.random() * 50;
  }

  private static getRandomDynamic(): number {
    const min = 1;
    const max = 2;
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    const multiply = Math.random() > 0.5;

    return Math.round(rand) * (multiply ? -1 : 1);
  }

  private getStartCoordinates(): { x: number; y: number } {
    const { innerHeight, innerWidth } = window;

    const startX = Math.random() * innerWidth;
    const x = this.getValidPoint(startX, innerWidth);

    const startY = Math.random() * innerHeight;
    const y = this.getValidPoint(startY, innerHeight);

    return { x, y };
  }

  private getValidPoint(startPoint: number, limit: number): number {
    let point: number;

    if (startPoint < this.r) {
      point = this.r;
    } else if (startPoint > limit - this.r) {
      point = limit - this.r;
    } else {
      point = startPoint;
    }

    return point;
  }

  private isReachedTheLimits(position: number, limit: number): boolean {
    return (position + this.r > limit) || (position - this.r < 0);
  }
}

const circles = [new Ball(ctx)];

function animate(): void {
  window.requestAnimationFrame(animate);

  canvas.clear();

  circles.forEach((it) => {
    it.update();
  });
}

animate();

let count = 0;

window.setInterval(() => {
  if (count < 500) {
    count += 1;

    circles.push(new Ball(ctx));
  }
}, 100);
