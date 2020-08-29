import { TCoordinate } from './types';
import { IShape } from '../interfaces';

type TContext = CanvasRenderingContext2D;

type TRadius = number;

type TUpdate = {
  x: TCoordinate;
  y: TCoordinate;
};

export default class Ball implements IShape<TUpdate> {
  private ctx: TContext;

  private x: TCoordinate;

  private y: TCoordinate;

  private readonly r: TRadius = 100;

  private readonly color: string = '#000';

  constructor(context: TContext) {
    this.ctx = context;
    this.x = this.getStartCoordinates().x;
    this.y = this.getStartCoordinates().y;
  }

  public update({ x, y }: TUpdate): void {
    this.updateCoordinates(x, y);
    this.draw();
  }

  private updateCoordinates(x: TCoordinate, y: TCoordinate): void {
    this.x = x;
    this.y = y;
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

  private getStartCoordinates(): { x: TCoordinate; y: TCoordinate } {
    const { canvas } = this.ctx;
    const { width, height } = canvas;

    const startX = Math.random() * width;
    const x = this.getValidStartPoint(startX, width);

    const startY = Math.random() * height;
    const y = this.getValidStartPoint(startY, height);

    return { x, y };
  }

  private getValidStartPoint(startPoint: TCoordinate, limit: TCoordinate): TCoordinate {
    let point: TCoordinate;

    if (startPoint < this.r) {
      point = this.r;
    } else if (startPoint > limit - this.r) {
      point = limit - this.r;
    } else {
      point = startPoint;
    }

    return point;
  }
}
