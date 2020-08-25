import { IWidget } from '../interfaces';
import Canvas from '../../Canvas';
import Circle from './Circle';
import throttle from '../../throttle';

export default class Circles implements IWidget {
  private canvas: Canvas;

  private ctx: CanvasRenderingContext2D;

  private circles: Circle[];

  private circlesCount: number;

  private mouseX?: number;

  private mouseY?: number;

  private animationId?: number;

  constructor() {
    this.canvas = Canvas.getInstance();
    this.ctx = this.canvas.getCtx();
    this.circles = [];
    this.circlesCount = 500;

    this.update = this.update.bind(this);

    this.addCircles();
    this.addMouseListener();
  }

  public start(): void {
    this.update();
  }

  public stop(): void {
    window.cancelAnimationFrame(this.animationId!);
  }

  private addMouseListener(): void {
    const cb = throttle((e: MouseEvent) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    }, 50);

    this.canvas.getCanvas().addEventListener('mousemove', cb);
  }

  private update(): void {
    this.animationId = window.requestAnimationFrame(this.update);

    this.canvas.clear();

    this.circles.forEach((it) => {
      it.update(this.mouseX, this.mouseY);
    });
  }

  private addCircles() {
    for (let i = 0; i < this.circlesCount; i += 1) {
      this.circles.push(new Circle(this.ctx));
    }
  }
}
