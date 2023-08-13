import AddPointView from '../view/add-point-view.js';
import EditPointView from '../view/edit-point-view.js';
// import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new AddPointView();
  taskListComponent = new EditPointView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.taskListComponent, this.boardComponent.getElement());
    render(new EditPointView(), this.taskListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointListView(), this.taskListComponent.getElement());
    }
  }
}
