import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../mock/utils.js';
import { SORT_TYPE } from '../const.js';
import { getDifferenceInMinutes } from '../mock/utils.js';

export default class ContainerPresenter {
  #container = null;
  #points = null;
  #pointList = new PointListView();
  #sortComponent = null;
  #pointPresenters = new Map();

  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedBoardPoints = [];

  #data = [];

  constructor({container, points}) {
    this.#container = container;
    this.#points = points;
  }

  init() {
    this.#data = [...this.#points.points];
    this.#sourcedBoardPoints = [...this.#points.points];
    this.#renderSort();
    this.#renderPointList();
  }

  #handlePointChange = (updatedPoint) => {
    this.#data = updateItem(this.#data, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SORT_TYPE.TIME:
        this.#data.sort((a, b) => {
          const timeA = getDifferenceInMinutes(a.dateFrom, a.dateTo);
          const timeB = getDifferenceInMinutes(b.dateFrom, b.dateTo);

          return timeB - timeA;
        });
        break;
      case SORT_TYPE.PRICE:
        this.#data.sort((a, b) => b.price - a.price);
        break;
      default:
        this.#data = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#clearPointList();
    this.#sortPoints(sortType);
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container);
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

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointList() {
    this.#data.map((item) => {
      this.#renderPoint(item);
    });
    render(this.#pointList, this.#container);
  }
}
