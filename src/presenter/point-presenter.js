import {remove, render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointListContainer = null;
  #handleModeChange = null;
  #handleDataChange = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  #offers = null;
  #destinations = null;

  constructor({pointListContainer, onModeChange, onDataChange, offers, destinations}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init(point) {
    this.#point = point;
    console.log(point);
    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editPointComponent;
    this.#pointComponent = new PointView({
      data: this.#point,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
      pointDestinations: this.#destinations.getById(point.destination),
      pointOffers: this.#offers.getByType(point.type),
    });
    this.#editPointComponent = new EditPointView({
      data: this.#point,
      pointDestinations: this.#destinations.get(),
      onSubmitClick: this.#handleFormSubmit,
      clickResetHandler: this.#resetClickHandler,
      nameDestination: this.#destinations.getById(point.destination),
      onDeleteClick: this.#handleDeleteClick,
      pointsOffers: this.#offers.get(),
    });
    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#editPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #resetClickHandler = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceEditFormToPoint();
  };

  #replacePointToEditForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }
}
