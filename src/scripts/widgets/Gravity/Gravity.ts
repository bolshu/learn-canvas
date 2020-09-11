import { IWidget } from '../interfaces';
import Canvas from '../../Canvas';
import Ball from './Ball';

export default class Gravity implements IWidget {
  private readonly canvas = Canvas.getInstance();

  private readonly ballsCount = 500;

  private balls: Ball[] = [];

  private animationId?: number;

  constructor() {
    this.updateCircle = this.updateCircle.bind(this);

    // this.mouseMoveHandlerCb = throttle(this.mouseMoveHandlerCb.bind(this), 24);
    // this.mouseDownHandlerCb = this.mouseDownHandlerCb.bind(this);
    // this.mouseUpHandlerCb = this.mouseUpHandlerCb.bind(this);
    // this.mouseLeaveHandlerCb = this.mouseLeaveHandlerCb.bind(this);
  }

  public start(): void {
    // this.addMouseListener();
    this.addBalls();
    this.updateCircle();
  }

  public stop(): void {
    // this.removeMouseListener();
    window.cancelAnimationFrame(this.animationId!);
  }

  private addBalls(): void {
    for (let i = 0; i < this.ballsCount; i += 1) {
      this.balls.push(new Ball());
    }
  }

  // private mouseLeaveHandlerCb(e: MouseEvent): void {
  //   console.log('OUT', e);
  //   console.log(this);
  // }

  // private mouseMoveHandlerCb(e: MouseEvent): void {
  //   this.mouseX = e.x;
  //   this.mouseY = e.y;
  // }

  // private mouseDownHandlerCb(e: MouseEvent): void {
  //   const { x, y } = e;
  //   const { radius: r, coordinates } = this.ball;
  //   const { x: ballX, y: ballY } = coordinates;

  //   if (
  //     x < ballX + r
  //     && x > ballX - r
  //     && y < ballY + r
  //     && y > ballY - r
  //   ) {
  //     this.isDragged = true;

  //     Canvas.getInstance().getCanvas().removeEventListener('mousedown', this.mouseDownHandlerCb);
  //     Canvas.getInstance().getCanvas().addEventListener('mouseup', this.mouseUpHandlerCb);
  //   }
  // }

  // private mouseUpHandlerCb(): void {
  //   this.isDragged = false;

  //   Canvas.getInstance().getCanvas().removeEventListener('mouseup', this.mouseUpHandlerCb);
  //   Canvas.getInstance().getCanvas().addEventListener('mousedown', this.mouseDownHandlerCb);
  // }

  // private addMouseListener(): void {
  //   Canvas.getInstance().getCanvas().addEventListener('mousemove', this.mouseMoveHandlerCb);
  //   Canvas.getInstance().getCanvas().addEventListener('mousedown', this.mouseDownHandlerCb);
  //   Canvas.getInstance().getCanvas().addEventListener('mouseleave', this.mouseLeaveHandlerCb);
  // }

  // private removeMouseListener(): void {
  //   Canvas.getInstance().getCanvas().removeEventListener('mousemove', this.mouseMoveHandlerCb);
  // }

  private updateCircle(): void {
    this.animationId = window.requestAnimationFrame(this.updateCircle);
    this.canvas.clear();

    this.balls.forEach((it) => {
      it.update();
    });
  }
}
