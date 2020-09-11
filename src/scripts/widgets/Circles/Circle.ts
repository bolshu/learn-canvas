import { TCoordinate } from './types';
import { IShape } from '../interfaces';
import Canvas from '../../Canvas';

type TDynamic = number;

type TRadius = number;

type TColor = string;

type TUpdate = {
  x?: TCoordinate;
  y?: TCoordinate;
};

export default class Circle implements IShape<TUpdate> {
  private readonly canvas = Canvas.getInstance();

  private readonly color = Circle.getColor();

  private readonly area = 100;

  private readonly rMin = 20;

  private readonly rMax = 100;

  private readonly rIncrease = 1;

  private readonly dMin = 1;

  private readonly dMax = 3;

  private x: TCoordinate = this.getStartCoordinates().x;

  private y: TCoordinate = this.getStartCoordinates().y;

  private dx: TDynamic = this.getDynamic();

  private dy: TDynamic = this.getDynamic();

  private r: TRadius = this.rMin;

  public update({ x, y }: TUpdate): void {
    this.updateRadius(x, y);

    if (this.isOutOfCanvas(this.x, this.canvas.element.width)) {
      this.dx = -this.dx;
    }

    if (this.isOutOfCanvas(this.y, this.canvas.element.height)) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  private updateRadius(x?: TCoordinate, y?: TCoordinate): void {
    if (
      x
      && y
      && x - this.x < this.area
      && x - this.x > -this.area
      && y - this.y < this.area
      && y - this.y > -this.area
      && this.r < this.rMax
    ) {
      this.r += this.rIncrease;
    } else if (this.r > this.rMin) {
      this.r -= this.rIncrease;
    }
  }

  private draw(): void {
    const ANGLE = {
      START: 0,
      END: Math.PI * 2,
    };

    this.canvas.context.fillStyle = this.color;
    this.canvas.context.beginPath();
    this.canvas.context.arc(this.x, this.y, this.r, ANGLE.START, ANGLE.END, false);
    this.canvas.context.fill();
  }

  private static getColor(): TColor {
    const palette = ['#2d4059', '#ea5455', '#decdc3', '#e5e5e5'];

    return palette[Math.floor(Math.random() * palette.length)];
  }

  private getDynamic(): TDynamic {
    const MULTIPLIER = Math.random() > 0.5 ? -1 : 1;
    const dRandom = Math.round(Math.random() * (this.dMax - this.dMin)) + 1;

    return dRandom * MULTIPLIER;
  }

  private getStartCoordinates(): { x: TCoordinate; y: TCoordinate } {
    const { element: { width, height } } = this.canvas;

    const x = this.getValidStartPoint(width);
    const y = this.getValidStartPoint(height);

    return { x, y };
  }

  private getValidStartPoint(limit: TCoordinate): TCoordinate {
    const startPoint = Math.random() * limit;

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

  private isOutOfCanvas(position: TCoordinate, limit: TCoordinate): boolean {
    return (position + this.r > limit) || (position - this.r < 0);
  }
}
