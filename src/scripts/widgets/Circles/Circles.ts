import { IWidget } from '../interfaces';
import Canvas from '../../Canvas';
import Circle from './Circle';
import throttle from '../../throttle';

export default class Circles implements IWidget {
  private canvas: Canvas;

  private ctx: CanvasRenderingContext2D;

  private circles: Circle[];

  private mouseHandlerCb: (e: MouseEvent) => void;

  private animationId?: number;

  private mouseX?: number;

  private mouseY?: number;

  private static readonly circlesCount = 500;

  constructor() {
    this.canvas = Canvas.getInstance();
    this.ctx = this.canvas.getCtx();
    this.circles = [];

    this.updateCircles = this.updateCircles.bind(this);
    this.mouseHandlerCb = throttle((e: MouseEvent) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    }, 50);

    this.addCircles();
  }

  public start(): void {
    this.addMouseListener();
    this.updateCircles();
  }

  public stop(): void {
    this.removeMouseListener();
    window.cancelAnimationFrame(this.animationId!);
  }

  private addMouseListener(): void {
    this.canvas.getCanvas().addEventListener('mousemove', this.mouseHandlerCb);
  }

  private removeMouseListener(): void {
    this.canvas.getCanvas().removeEventListener('mousemove', this.mouseHandlerCb);
  }

  private updateCircles(): void {
    this.animationId = window.requestAnimationFrame(this.updateCircles);

    this.canvas.clear();

    this.circles.forEach((it) => {
      it.update(this.mouseX, this.mouseY);
    });
  }

  private addCircles() {
    for (let i = 0; i < Circles.circlesCount; i += 1) {
      this.circles.push(new Circle(this.ctx));
    }
  }
}
