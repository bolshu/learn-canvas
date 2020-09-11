import { TCoordinate } from './types';
import Canvas from '../../Canvas';
import { IShape } from '../interfaces';

type TRadius = number;

export default class Ball implements IShape {
  private readonly canvas = Canvas.getInstance();

  private readonly x = this.getStartCoordinate(this.canvas.element.width);

  private readonly color: string = 'tomato';

  private readonly gravity = 2;

  private readonly friction = 0.9;

  private readonly r: TRadius = Math.random() * 30;

  private y: TCoordinate = this.getStartCoordinate(this.canvas.element.height / 2);

  private d = 5;

  public update(): void {
    if (this.y + this.r + this.d > this.canvas.element.height) {
      this.d = -this.d * this.friction;
    } else {
      this.d += this.gravity;
    }

    this.y += this.d;

    this.draw();
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
    this.canvas.context.stroke();
  }

  private getStartCoordinate(limit: TCoordinate): TCoordinate {
    const startPoint = Math.random() * limit;

    let point: TCoordinate;

    if (startPoint < this.r) {
      point = this.r;
    } else if (startPoint + this.r > limit) {
      point = limit - this.r;
    } else {
      point = startPoint;
    }

    return point;
  }
}
