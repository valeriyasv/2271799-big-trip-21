import AbstractView from '../framework/view/abstract-view';

function addNewEvent() {
  return (
    `<button class='trip-main__event-add-btn  btn  btn--big  btn--yellow' type='button'>
    New event</button>`
  );
}

export default class NewEventButton extends AbstractView {
  #handleClick = null;

  constructor ({onClick}) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#clickHandler)
  }

  get template() {
    return addNewEvent();
  }

  #clickHandler = (evt) => {
    console.log('but')
    evt.preventDefault();
    this.#handleClick();
  };
}
