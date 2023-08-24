import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

// const testArr = [
//   {
//     icon: 'img/icons/taxi.png',
//     direction: 'Vladivostok',
//     price: '150'
//   },
//   {
//     icon: 'img/icons/flight.png',
//     direction: 'Moskow',
//     price: '670'
//   },
//   {
//     icon: 'img/icons/drive.png',
//     direction: 'Khabarovsk',
//     price: '89'
//   }
// ];
export default class ContainerPresenter {
  pointList = new PointListView();

  constructor({container, points}) {
    this.container = container;
    this.points = points;
  }

  init() {
    render(new SortView(), this.container);
    render(this.pointList, this.container);
    render(new EditPointView(), this.pointList.getElement());
    console.log(this.points.points, 'point')
    this.points.points.forEach((element) => {
      console.log(element.offers, 'llllllllllllll')
      render(new PointView(element.type.img, element.destination.name, element.price, element.offers), this.pointList.getElement());
    });
  }
}
