import { IWidget } from '../interfaces';
import Canvas from '../../Canvas';
import Ball from './Ball';

export default class Gravity implements IWidget {
  private readonly canvas = Canvas.getInstance();

  private readonly ballsCount = 500;

  private balls: Ball[] = [];

  private animationId?: number;

  constructor() {
    this.addBalls();

    this.updateCircle = this.updateCircle.bind(this);
  }

  public start(): void {
    this.updateCircle();
  }

  public stop(): void {
    window.cancelAnimationFrame(this.animationId!);
  }

  private addBalls(): void {
    for (let i = 0; i < this.ballsCount; i += 1) {
      this.balls.push(new Ball());
    }
  }

  private updateCircle(): void {
    this.animationId = window.requestAnimationFrame(this.updateCircle);
    this.canvas.clear();

    this.balls.forEach((it) => {
      it.update();
    });
  }
}
