import throttle from './throttle';

type TContext = CanvasRenderingContext2D;

type TCanvas = HTMLCanvasElement;

interface ICanvas {
  clear(): void;
}

export default class Canvas implements ICanvas {
  private ctx: TContext;

  private el: TCanvas;

  private static instance: Canvas;

  constructor() {
    Canvas.create();

    this.el = <TCanvas>document.querySelector('#canvas')!;
    this.ctx = this.el.getContext('2d')!;

    this.handleResize = throttle(this.handleResize.bind(this), 100);
    this.addResizeListener();
  }

  public static getInstance(): Canvas {
    if (!Canvas.instance) {
      Canvas.instance = new Canvas();
    }

    return Canvas.instance;
  }

  private static create(): void {
    const element = document.createElement('canvas')!;
    const { innerWidth, innerHeight } = window;

    element.setAttribute('id', 'canvas');
    element.setAttribute('width', innerWidth.toString());
    element.setAttribute('height', innerHeight.toString());

    document.body.appendChild(element);
  }

  public clear(): void {
    const { width, height } = this.el;
    this.ctx.clearRect(0, 0, width, height);
  }

  private handleResize(): void {
    const { innerWidth, innerHeight } = window;

    this.el.width = innerWidth;
    this.el.height = innerHeight;
  }

  private addResizeListener(): void {
    window.addEventListener('resize', this.handleResize);
  }

  get context(): TContext {
    return this.ctx;
  }

  get element(): TCanvas {
    return this.el;
  }
}
