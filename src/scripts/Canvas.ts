type TContext = CanvasRenderingContext2D;

type TCanvas = HTMLCanvasElement;

interface ICanvas {
  getCanvas(): TCanvas;
  clear(): void;
}

export default class Canvas implements ICanvas {
  private ctx: TContext;

  private canvas: TCanvas;

  private static instance: Canvas;

  constructor() {
    Canvas.create();

    this.canvas = <TCanvas>document.querySelector('#canvas')!;
    this.ctx = this.canvas.getContext('2d')!;

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
    element.setAttribute('width', (innerWidth - 200).toString());
    element.setAttribute('height', innerHeight.toString());

    document.body.appendChild(element);
  }

  public clear() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }

  public getCanvas() {
    return this.canvas;
  }

  private addResizeListener(): void {
    window.addEventListener('resize', () => {
      const { innerWidth, innerHeight } = window;

      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
    });
  }

  get context(): TContext {
    return this.ctx;
  }
}
