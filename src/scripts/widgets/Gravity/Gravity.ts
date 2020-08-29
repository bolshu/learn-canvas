import { IWidget } from '../interfaces';
import { TCoordinate } from './types';
import Canvas from '../../Canvas';
import throttle from '../../throttle';
import Ball from './Ball';

export default class Gravity implements IWidget {
  private ball: Ball;

  private animationId?: number;

  private mouseX: TCoordinate;

  private mouseY: TCoordinate;

  constructor() {
    this.ball = new Ball(Canvas.getInstance().context);
    this.mouseX = 0;
    this.mouseY = 0;

    this.updateCircle = this.updateCircle.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    this.mouseHandlerCb = throttle(this.mouseHandlerCb.bind(this), 50);
  }

  public start(): void {
    this.addMouseListener();
    this.updateCircle();
  }

  public stop(): void {
    this.removeMouseListener();
    window.cancelAnimationFrame(this.animationId!);
  }

  private mouseHandlerCb(e: MouseEvent): void {
    this.mouseMoveHandler(e);
  }

  private mouseMoveHandler(e: MouseEvent): void {
    this.mouseX = e.x;
    this.mouseY = e.y;
  }

  // private mouseDownHandler(e: MouseEvent): void {
  //   this.mouseX = e.x;
  //   this.mouseY = e.y;
  // }

  private addMouseListener(): void {
    Canvas.getInstance().getCanvas().addEventListener('mousemove', this.mouseHandlerCb);
  }

  private removeMouseListener(): void {
    Canvas.getInstance().getCanvas().removeEventListener('mousemove', this.mouseHandlerCb);
  }

  private updateCircle(): void {
    this.animationId = window.requestAnimationFrame(this.updateCircle);
    Canvas.getInstance().clear();
    this.ball.update({
      x: this.mouseX,
      y: this.mouseY,
    });
  }
}
