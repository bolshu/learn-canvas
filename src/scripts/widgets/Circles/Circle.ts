import { TCoordinate } from './types';

type TContext = CanvasRenderingContext2D;

type TDynamic = number;

type TRadius = number;

type TColor = string;

export default class Circle {
  private ctx: TContext;

  private x: TCoordinate;

  private y: TCoordinate;

  private dx: TDynamic;

  private dy: TDynamic;

  private r: TRadius;

  private readonly color = Circle.getColor();

  private static readonly area = 100;

  private static readonly rMin = 20;

  private static readonly rMax = 100;

  private static readonly rIncrease = 1;

  private static readonly dMin = 1;

  private static readonly dMax = 3;

  constructor(context: TContext) {
    this.ctx = context;
    this.x = this.getStartCoordinates().x;
    this.y = this.getStartCoordinates().y;
    this.dx = Circle.getDynamic();
    this.dy = Circle.getDynamic();
    this.r = Circle.rMin;
  }

  public update(mouseX?: TCoordinate, mouseY?: TCoordinate): void {
    this.updateRadius(mouseX, mouseY);

    if (this.isOutOfArea(this.x, this.ctx.canvas.width)) {
      this.dx = -this.dx;
    }

    if (this.isOutOfArea(this.y, this.ctx.canvas.height)) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  private updateRadius(mouseX?: TCoordinate, mouseY?: TCoordinate): void {
    if (
      mouseX
      && mouseY
      && mouseX - this.x < Circle.area
      && mouseX - this.x > -Circle.area
      && mouseY - this.y < Circle.area
      && mouseY - this.y > -Circle.area
      && this.r < Circle.rMax
    ) {
      this.r += Circle.rIncrease;
    } else if (this.r > Circle.rMin) {
      this.r -= Circle.rIncrease;
    }
  }

  private draw(): void {
    const ANGLE = {
      START: 0,
      END: Math.PI * 2,
    };

    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, ANGLE.START, ANGLE.END, false);
    this.ctx.fill();
  }

  private static getColor(): TColor {
    const palette = ['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'];

    return palette[Math.floor(Math.random() * palette.length)];
  }

  private static getDynamic(): TDynamic {
    const MULTIPLIER = Math.random() > 0.5 ? -1 : 1;
    const dRandom = Math.round(Math.random() * (this.dMax - this.dMin)) + 1;

    return dRandom * MULTIPLIER;
  }

  private getStartCoordinates(): { x: TCoordinate; y: TCoordinate } {
    const { canvas } = this.ctx;
    const { width, height } = canvas;

    const startX = Math.random() * width;
    const x = Circle.getValidStartPoint(startX, width);

    const startY = Math.random() * height;
    const y = Circle.getValidStartPoint(startY, height);

    return { x, y };
  }

  private static getValidStartPoint(startPoint: TCoordinate, limit: TCoordinate): TCoordinate {
    let point: TCoordinate;

    if (startPoint < this.rMin) {
      point = this.rMin;
    } else if (startPoint > limit - this.rMin) {
      point = limit - this.rMin;
    } else {
      point = startPoint;
    }

    return point;
  }

  private isOutOfArea(position: TCoordinate, limit: TCoordinate): boolean {
    return (position + this.r > limit) || (position - this.r < 0);
  }
}
