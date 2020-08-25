interface INavigation {
  init(): void;
}

type TWidgets = string[];

type THandler = (widget: string) => void;

export default class Navigation implements INavigation {
  private widgets: TWidgets;

  private currentWidget: string;

  private handler: THandler;

  private widgetList?: NodeListOf<HTMLLIElement>;

  private static readonly activeClassName = 'active';

  constructor(
    widgets: TWidgets,
    handler: THandler,
  ) {
    this.widgets = widgets;
    [this.currentWidget] = this.widgets;
    this.handler = handler;
  }

  public init(): void {
    if (this.widgets.length < 2) return;

    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    nav.appendChild(ul);

    this.widgets.forEach((it) => {
      const li = document.createElement('li');
      li.innerText = it;
      li.setAttribute('id', it);

      if (it !== this.currentWidget) {
        li.classList.add(Navigation.activeClassName);
      }

      ul.appendChild(li);
    });

    document.body.appendChild(nav);

    this.addClickListener();
    this.widgetList = document.querySelectorAll('li');
  }

  private addClickListener(): void {
    const nav = document.querySelector('nav')!;

    nav.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;

      if (
        target.tagName !== 'LI'
        || target.classList.contains(Navigation.activeClassName)
      ) return;

      const { id } = target;

      this.removeWidgetActiveClass();
      this.addWidgetActiveClass(id);

      this.handler(id);
    }, false);
  }

  private removeWidgetActiveClass(): void {
    this.widgetList!.forEach((it) => {
      it.classList.remove(Navigation.activeClassName);
    });
  }

  private addWidgetActiveClass(widgetId: string): void {
    this.widgetList!.forEach((it) => {
      if (it.getAttribute('id') === widgetId) {
        it.classList.add(Navigation.activeClassName);
      }
    });
  }
}
