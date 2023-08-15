import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';

import { render } from '../render.js';

const testArr = [
  {
    icon: 'img/icons/taxi.png',
    direction: 'Vladivostok',
    price: '150'
  },
  {
    icon: 'img/icons/flight.png',
    direction: 'Moskow',
    price: '670'
  },
  {
    icon: 'img/icons/drive.png',
    direction: 'Khabarovsk',
    price: '89'
  }
];
export default class ContainerPresenter {
  pointList = new PointListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new SortView(), this.container);
    render(this.pointList, this.container);
    render(new EditPointView(), this.pointList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(testArr[i].icon, testArr[i].direction, testArr[i].price), this.pointList.getElement());
    }
  }
}
