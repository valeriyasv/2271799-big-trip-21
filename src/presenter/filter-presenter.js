import { render, replace, remove } from '../framework/render';
import FilterView from '../view/filter-view';
import { UpdateType } from '../const';
import { filterType } from '../mock/utils';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #currentFilter = null;
  #filterComponent = null;

  constructor ({filterContainer, filterModel, pointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const point = this.#pointsModel.points;

    return Object.entries(filterType).map(([typeFilter, filterPoints]) => ({
      type: typeFilter,
      isChecked: typeFilter === this.#currentFilter,
      isDisabled: filterPoints(point).length === 0
    }));
  }

  init() {
    const filters = this.filters;

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (typeFilter) => {
    console.log(this.#filterModel.filter, 'fil')
    // if (this.#filterModel.filter === typeFilter) {
    //   // eslint-disable-next-line no-useless-return
    //   return;
    // }

    this.#filterModel.set(UpdateType.MAJOR, typeFilter);
  };
}
