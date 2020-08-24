// import throttle from './throttle';

export default class Canvas {
  private ctx: CanvasRenderingContext2D;

  private canvas: HTMLCanvasElement;

  constructor() {
    Canvas.createCanvas();

    this.canvas = <HTMLCanvasElement>document.querySelector('#canvas')!;
    this.ctx = this.canvas.getContext('2d')!;

    this.addResizeListener();
  }

  private static createCanvas(): void {
    const element = document.createElement('canvas')!;

    element.setAttribute('id', 'canvas');
    element.setAttribute('width', window.innerWidth.toString());
    element.setAttribute('height', window.innerHeight.toString());

    document.body.appendChild(element);
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public getCanvas() {
    return this.canvas;
  }

  public getCtx() {
    return this.ctx;
  }

  private addResizeListener(): void {
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }
}
