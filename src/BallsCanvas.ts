import Canvas from './Canvas';
import Ball from './Ball';
import throttle from './throttle';

export default class BallsCanvas {
  private canvas: Canvas;

  private ctx: CanvasRenderingContext2D;

  private balls: Ball[];

  private mouseX?: number;

  private mouseY?: number;

  constructor() {
    this.canvas = new Canvas();
    this.ctx = this.canvas.getCtx();
    this.balls = [];

    this.addBalls();
    this.addMouseListener();

    this.update = this.update.bind(this);
  }

  public run(): void {
    this.update();
  }

  private addMouseListener(): void {
    const listener = throttle((e: MouseEvent) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    }, 50);

    this.canvas.getCanvas().addEventListener('mousemove', listener);
  }

  private update(): void {
    window.requestAnimationFrame(this.update);

    this.canvas.clear();

    this.balls.forEach((it) => {
      it.update(this.mouseX, this.mouseY);
    });
  }

  private addBalls() {
    const NUMBER_OF_BALLS = 500;

    for (let i = 0; i < NUMBER_OF_BALLS; i += 1) {
      this.balls.push(new Ball(this.ctx));
    }
  }
}
