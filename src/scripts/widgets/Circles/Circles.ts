import { IWidget } from '../interfaces';
import { TCoordinate } from './types';
import Canvas from '../../Canvas';
import Circle from './Circle';
import throttle from '../../throttle';

export default class Circles implements IWidget {
  private circles: Circle[];

  private animationId?: number;

  private x?: TCoordinate;

  private y?: TCoordinate;

  private readonly canvas = Canvas.getInstance();

  private readonly circlesCount = 500;

  private readonly clearMouseCoordinatesTimeout = 3000;

  constructor() {
    this.circles = [];

    this.updateCircles = this.updateCircles.bind(this);
    this.resetMouseCoordinates = throttle(
      this.resetMouseCoordinates.bind(this),
      this.clearMouseCoordinatesTimeout,
    );
    this.mouseHandlerCb = throttle(this.mouseHandlerCb.bind(this), 50);
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

  private mouseHandlerCb(e: MouseEvent) {
    this.x = e.x;
    this.y = e.y;

    this.resetMouseCoordinates();
  }

  private resetMouseCoordinates(): void {
    const timer = window.setTimeout(() => {
      this.x = undefined;
      this.y = undefined;

      window.clearTimeout(timer);
    }, this.clearMouseCoordinatesTimeout);
  }

  private addMouseListener(): void {
    this.canvas.element.addEventListener('mousemove', this.mouseHandlerCb);
  }

  private removeMouseListener(): void {
    this.canvas.element.removeEventListener('mousemove', this.mouseHandlerCb);
  }

  private updateCircles(): void {
    this.animationId = window.requestAnimationFrame(this.updateCircles);

    this.canvas.clear();

    this.circles.forEach((it) => {
      it.update({
        x: this.x,
        y: this.y,
      });
    });
  }

  private addCircles() {
    for (let i = 0; i < this.circlesCount; i += 1) {
      this.circles.push(new Circle());
    }
  }
}
