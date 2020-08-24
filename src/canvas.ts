export default class Canvas {
  ctx: CanvasRenderingContext2D;

  canvas: HTMLCanvasElement;

  constructor() {
    Canvas.init();

    this.canvas = <HTMLCanvasElement>document.querySelector('#canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
  }

  private static init(): void {
    const element = document.createElement('canvas')!;

    element.setAttribute('id', 'canvas');
    element.setAttribute('width', window.innerWidth.toString());
    element.setAttribute('height', window.innerHeight.toString());

    document.body.appendChild(element);
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
