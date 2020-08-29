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

  private isDragged: boolean;

  constructor() {
    this.ball = new Ball(Canvas.getInstance().context);
    this.mouseX = 0;
    this.mouseY = 0;
    this.isDragged = false;

    this.updateCircle = this.updateCircle.bind(this);

    this.mouseMoveHandlerCb = throttle(this.mouseMoveHandlerCb.bind(this), 24);
    this.mouseDownHandlerCb = this.mouseDownHandlerCb.bind(this);
    this.mouseUpHandlerCb = this.mouseUpHandlerCb.bind(this);
    this.mouseLeaveHandlerCb = this.mouseLeaveHandlerCb.bind(this);
  }

  public start(): void {
    this.addMouseListener();
    this.updateCircle();
  }

  public stop(): void {
    this.removeMouseListener();
    window.cancelAnimationFrame(this.animationId!);
  }

  private mouseLeaveHandlerCb(): void {
    this.resetHandlers();
  }

  private mouseMoveHandlerCb(e: MouseEvent): void {
    this.mouseX = e.x;
    this.mouseY = e.y;
  }

  private mouseDownHandlerCb(e: MouseEvent): void {
    const { x, y } = e;
    const { radius: r, coordinates } = this.ball;
    const { x: ballX, y: ballY } = coordinates;

    if (
      x < ballX + r
      && x > ballX - r
      && y < ballY + r
      && y > ballY - r
    ) {
      this.isDragged = true;

      Canvas.getInstance().getCanvas().addEventListener('mouseup', this.mouseUpHandlerCb);
      Canvas.getInstance().getCanvas().addEventListener('mouseleave', this.mouseLeaveHandlerCb);
    }
  }

  private mouseUpHandlerCb(): void {
    this.resetHandlers();
  }

  private resetHandlers(): void {
    this.isDragged = false;

    Canvas.getInstance().getCanvas().removeEventListener('mouseup', this.mouseUpHandlerCb);
    Canvas.getInstance().getCanvas().removeEventListener('mouseleave', this.mouseLeaveHandlerCb);
  }

  private addMouseListener(): void {
    Canvas.getInstance().getCanvas().addEventListener('mousemove', this.mouseMoveHandlerCb);
    Canvas.getInstance().getCanvas().addEventListener('mousedown', this.mouseDownHandlerCb);
    Canvas.getInstance().getCanvas().addEventListener('mouseleave', this.mouseLeaveHandlerCb);
  }

  private removeMouseListener(): void {
    Canvas.getInstance().getCanvas().removeEventListener('mousemove', this.mouseMoveHandlerCb);
  }

  private updateCircle(): void {
    this.animationId = window.requestAnimationFrame(this.updateCircle);
    Canvas.getInstance().clear();
    this.ball.update({
      x: this.mouseX,
      y: this.mouseY,
      isDragged: this.isDragged,
    });
  }
}
