import {render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../mock/utils.js';
export default class ContainerPresenter {
  #container = null;
  #points = null;
  #pointList = new PointListView();
  #sortComponent = null;
  #pointPresenters = new Map();

  #data = [];

  constructor({container, points}) {
    this.#container = container;
    this.#points = points;
  }

  init() {
    // render(new SortView(), this.#container);
    this.#data = [...this.#points.points];
    this.#renderPointList();
  }

  #handlePointChange = (updatedPoint) => {
    this.#data = updateItem(this.#data, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortTypeChange = () => {

  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint (dataPoint) {
    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#pointList.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(dataPoint);
    this.#pointPresenters.set(dataPoint.id, pointPresenter);
  }

  #renderPointList() {
    this.#data.map((item) => {
      this.#renderPoint(item);
    });
    render(this.#pointList, this.#container);
  }
}
