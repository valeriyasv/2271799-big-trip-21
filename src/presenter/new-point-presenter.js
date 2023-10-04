import {remove, render, RenderPosition} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #destinationModel = null;

  #pointEditCopmonent = null;

  constructor ({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditCopmonent !== null) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    this.#pointEditCopmonent = new EditPointView({
      pointDestinations: this.#destinationModel,
      onSubmitClick: this.#handleFormSubmit,
      clickResetHandler: this.#handleDeleteClick
    });

    render(this.#pointEditCopmonent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    if (this.#pointEditCopmonent === null) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditCopmonent);
    this.#pointEditCopmonent = null;

    document.querySelector('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_TASK,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  setSaving() {
    this.#pointEditCopmonent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditCopmonent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditCopmonent.shake(resetFormState);
  }
}
