export default class Ball {
  private ctx: CanvasRenderingContext2D;

  private r: number;

  private x: number;

  private y: number;

  private dx: number;

  private dy: number;

  private color: string;

  private static MIN_R: number;

  constructor(context: CanvasRenderingContext2D) {
    Ball.MIN_R = 10;

    this.r = Ball.MIN_R;
    this.x = this.getStartCoordinates().x;
    this.y = this.getStartCoordinates().y;
    this.dx = Ball.getDynamic();
    this.dy = Ball.getDynamic();
    this.color = Ball.getRandomHexColor();
    this.ctx = context;
  }

  public update(mouseX?: number, mouseY?: number): void {
    this.updateRadius(mouseX, mouseY);

    if (this.isReachedTheLimit(this.x, window.innerWidth)) {
      this.dx = -this.dx;
    }

    if (this.isReachedTheLimit(this.y, window.innerHeight)) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  private updateRadius(mouseX?: number, mouseY?: number): void {
    const BALL_AREA = 50;
    const MAX_R = 200;

    if (
      mouseX
      && mouseY
      && mouseX - this.x < BALL_AREA
      && mouseX - this.x > -BALL_AREA
      && mouseY - this.y < BALL_AREA
      && mouseY - this.y > -BALL_AREA
      && this.r < MAX_R
    ) {
      this.r += 1;
    } else if (this.r > Ball.MIN_R) {
      this.r -= 1;
    }
  }

  private draw(): void {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.ctx.fill();
  }

  private static getRandomHexColor(): string {
    const palette = ['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'];

    return palette[Math.floor(Math.random() * palette.length)];
  }

  private static getDynamic(): number {
    const min = 0.5;
    const max = 3;
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    const multiply = Math.random() > 0.5 ? -1 : 1;

    return Math.round(rand) * multiply;
  }

  private getStartCoordinates(): { x: number; y: number } {
    const { innerHeight, innerWidth } = window;

    const startX = Math.random() * innerWidth;
    const x = this.getStartValidPoint(startX, innerWidth);

    const startY = Math.random() * innerHeight;
    const y = this.getStartValidPoint(startY, innerHeight);

    return { x, y };
  }

  private getStartValidPoint(startPoint: number, limit: number): number {
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

  private isReachedTheLimit(position: number, limit: number): boolean {
    return (position + this.r > limit) || (position - this.r < 0);
  }
}
