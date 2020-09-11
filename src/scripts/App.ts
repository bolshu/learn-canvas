import Canvas from './Canvas';
import Navigation from './Navigation';
import { IWidget } from './widgets/interfaces';

// widgets
import Circles from './widgets/Circles/Circles';
import Gravity from './widgets/Gravity/Gravity';

interface IApp {
  run(): void;
}

export default class App implements IApp {
  private readonly canvas = Canvas.getInstance();

  private widgets: Record<string, IWidget>;

  private navigation: Navigation;

  constructor() {
    this.widgets = {
      gravity: new Gravity(),
      circles: new Circles(),
    };

    this.navigationHandler = this.navigationHandler.bind(this);

    this.navigation = new Navigation(
      Object.keys(this.widgets),
      this.navigationHandler,
    );
  }

  public run(): void {
    this.navigation.init();
    this.runFirstWidget();
  }

  private runFirstWidget(): void {
    this.widgets[Object.keys(this.widgets)[0]].start();
  }

  private navigationHandler(widgetKey: string): void {
    Object.values(this.widgets).forEach((it) => {
      it.stop();
    });

    this.canvas.clear();

    this.widgets[widgetKey].start();
  }
}
