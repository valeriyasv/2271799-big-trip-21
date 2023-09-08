import {render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';

export default class ContainerPresenter {
  pointList = new PointListView();

  constructor({container, points}) {
    this.container = container;
    this.points = points;
  }

  init() {
    render(new SortView(), this.container);
    this.data = [...this.points.points];
    this.#renderPointList();
  }

  #renderPoints (dataPoint) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      data: dataPoint,
      onEditClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPoint = new EditPointView({
      data: dataPoint,
      onSubmitClick: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseEdit: () => {
        replaceEditFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToEditForm() {
      replace(editPoint, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, editPoint);
    }

    render(pointComponent, this.pointList.element);
  }

  #renderPointList () {
    render(this.pointList, this.container);
    this.data.map((item) => {
      this.#renderPoints(item);
    });
  }
}
