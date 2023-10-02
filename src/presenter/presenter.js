import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EmptyListView from '../view/empty-list-points.js';
import PointPresenter from './point-presenter.js';
import { FilterTypes } from '../const.js';
import { filterType } from '../mock/utils.js';
import { UpdateType } from '../const.js';
import { SortTypes } from '../const.js';
import { getDifferenceInMinutes } from '../mock/utils.js';
import { updateItem } from '../mock/utils.js';
import dayjs from 'dayjs';
export default class ContainerPresenter {
  #container = null;
  #points = null;
  #filterModel = null;

  #pointList = new PointListView();
  #sortComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortTypes.DEFAULT;
  #sourcedBoardPoints = [];
  #filterType = FilterTypes.EVERYTHING;

  #data = [];

  constructor({container, points, filterModel}) {
    this.#container = container;
    this.#points = points;
    this.#filterModel = filterModel;

    this.#points.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#points.points;
    const filterPoints = filterType[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortTypes.PRICE:
        filterPoints.sort((a, b) => b.price - a.price);
        break;
      case SortTypes.TIME:
        filterPoints.sort((a, b) => {
          const timeA = getDifferenceInMinutes(a.dateFrom, a.dateTo);
          const timeB = getDifferenceInMinutes(b.dateFrom, b.dateTo);
          return timeB - timeA;
        });
        break;
      case SortTypes.DEFAULT:
        filterPoints.sort((a, b) => {
          const dateA = dayjs(a.dateFrom).valueOf();
          const dateB = dayjs(b.dateFrom).valueOf();
          return dateA - dateB;
        });
    }
    return filterPoints;
  }

  init() {
    this.#data = [...this.#points.points];
    this.#sourcedBoardPoints = [...this.#points.points];
    this.#renderSort();
    this.#renderPointList();
    this.#renderEmpty();
  }

  #handlePointChange = (updatedPoint) => {
    this.#data = updateItem(this.#data, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortTypes.TIME:
        this.#data.sort((a, b) => {
          const timeA = getDifferenceInMinutes(a.dateFrom, a.dateTo);
          const timeB = getDifferenceInMinutes(b.dateFrom, b.dateTo);
          return timeB - timeA;
        });
        break;
      case SortTypes.PRICE:
        this.#data.sort((a, b) => b.price - a.price);
        break;
      case SortTypes.DEFAULT:
        this.#data.sort((a, b) => {
          const dateA = dayjs(a.dateFrom).valueOf();
          const dateB = dayjs(b.dateFrom).valueOf();
          return dateA - dateB;
        });
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

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters?.get(data.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList();
        this.#renderPointList();
        break;
    }
  };

  #renderEmpty = () => {
    if (this.#points.length === 0) {
      render(new EmptyListView(), this.#container);
    }
  };

  #renderPointList() {
    this.points.map((item) => {
      this.#renderPoint(item);
    });
    render(this.#pointList, this.#container);
  }
}
