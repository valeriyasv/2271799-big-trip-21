import {render, RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import LoadingView from '../view/loading-view.js';
import EmptyListView from '../view/empty-list-points.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {FilterTypes, UpdateType, SortTypes, UserAction} from '../const.js';
import {filterType, getDifferenceInMinutes} from '../mock/utils.js';
import dayjs from 'dayjs';
import {remove} from 'lodash';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ContainerPresenter {
  #container = null;
  #points = null;
  #filterModel = null;

  #pointList = new PointListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortTypes.DEFAULT;
  #sourcedBoardPoints = this.#points;
  #filterType = FilterTypes.EVERYTHING;

  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #offers = null;
  #destinations = null;

  constructor({container, points, filterModel, onNewPointDestroy, offers, destinations}) {
    this.#container = container;
    this.#points = points;
    this.#filterModel = filterModel;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointList.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });
    this.#points.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filtersTypes = this.#filterModel.filter;
    const points = this.#points.points;
    const filteredPoints = filterType[filtersTypes](points);
    switch (this.#currentSortType) {
      case SortTypes.PRICE:
        filteredPoints.sort((a, b) => b.price - a.price);
        break;
      case SortTypes.TIME:
        filteredPoints.sort((a, b) => {
          const timeA = getDifferenceInMinutes(a.dateFrom, a.dateTo);
          const timeB = getDifferenceInMinutes(b.dateFrom, b.dateTo);
          return timeB - timeA;
        });
        break;
      case SortTypes.DEFAULT:
        filteredPoints.sort((a, b) => {
          const dateA = dayjs(a.dateFrom).valueOf();
          const dateB = dayjs(b.dateFrom).valueOf();
          return dateA - dateB;
        });
    }
    return filteredPoints;
  }

  init() {
    this.#renderSort();
    // setTimeout(() => this.#renderPointList(), 1000)
    this.#renderPointList();
    this.#renderEmpty();
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortTypes.TIME:
        this.points.sort((a, b) => {
          const timeA = getDifferenceInMinutes(a.dateFrom, a.dateTo);
          const timeB = getDifferenceInMinutes(b.dateFrom, b.dateTo);
          return timeB - timeA;
        });
        break;
      case SortTypes.PRICE:
        this.points.sort((a, b) => b.price - a.price);
        break;
      case SortTypes.DEFAULT:
        this.points.sort((a, b) => {
          const dateA = dayjs(a.dateFrom).valueOf();
          const dateB = dayjs(b.dateFrom).valueOf();
          return dateA - dateB;
        });
        break;
      default:
        this.points = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#points.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointPresenters.setSaving();
        try {
          await this.#points.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#points.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList();
        this.#renderPointList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortPoints(sortType);
    this.#clearPointList();

    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      pointListContainer: this.#pointList,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.#destinations,
      offers: this.#offers
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    // if (this.#points.points === 0) {
    //   console.log('yy')
    //   return;
    // }

    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#pointList, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderEmpty = () => {
    if (this.#points.length === 0) {
      render(new EmptyListView(), this.#container);
    }
  };

  createPoint() {
    this.#currentSortType = SortTypes.DEFAULT;
    this.#filterModel.set(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderPointsContainer() {
    render(this.#pointList, this.#container);
  }

  #renderPointList() {

    this.#renderPoints();
    this.#renderPointsContainer();
  }
}
