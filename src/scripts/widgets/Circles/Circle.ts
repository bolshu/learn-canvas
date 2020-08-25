type TContext = CanvasRenderingContext2D;

export default class Circle {
  private ctx: TContext;

  private rMin: number;

  private rMax: number;

  private r: number;

  private x: number;

  private y: number;

  private dx: number;

  private dy: number;

  private color: string;

  private circleArea: number;

  constructor(context: TContext) {
    this.ctx = context;
    this.rMin = 10;
    this.rMax = 200;
    this.r = this.rMin;
    this.x = this.getStartCoordinates().x;
    this.y = this.getStartCoordinates().y;
    this.dx = Circle.getDynamic();
    this.dy = Circle.getDynamic();
    this.color = Circle.getRandomHexColor();
    this.circleArea = 50;
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
    if (
      mouseX
      && mouseY
      && mouseX - this.x < this.circleArea
      && mouseX - this.x > -this.circleArea
      && mouseY - this.y < this.circleArea
      && mouseY - this.y > -this.circleArea
      && this.r < this.rMax
    ) {
      this.r += 1;
    } else if (this.r > this.rMin) {
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
    const x = this.getValidStartPoint(startX, innerWidth);

    const startY = Math.random() * innerHeight;
    const y = this.getValidStartPoint(startY, innerHeight);

    return { x, y };
  }

  private getValidStartPoint(startPoint: number, limit: number): number {
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
