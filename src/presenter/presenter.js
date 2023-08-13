import AddPointView from '../view/add-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import { render } from '../render.js';

export default class ContainerPresenter {
  createPoint = new AddPointView();
  editPoint = new EditPointView();
  sortView = new SortView();
  currentPoint = new PointListView();

  constructor(container) {
    this.container = container;
  }

  init() {
    render(new EditPointView(), this.editPoint.getElement());
    render(new AddPointView, this.createPoint.getElement());
    render(new SortView(), this.sortView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointListView(), this.currentPoint.getElement());
    }
  }
}
