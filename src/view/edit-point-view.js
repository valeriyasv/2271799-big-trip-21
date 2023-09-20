import AbstractView from '../framework/view/abstract-view';
import { TYPES } from '../const';

function editPointTemplate ({type, destination, offers, price, name}) {
  return (
    ` <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${type.img}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
            ${
    TYPES.map((item) => (
      `<div class="event__type-item">
                          <input id="event-type-${item.name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.name.toLowerCase()}" ${type.name.toLowerCase() === item.name.toLowerCase() ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${item.name.toLowerCase()}" for="event-type-${item.name.toLowerCase()}-1">${item.name}</label>
                        </div>`)).join('')}
            </fieldset>
          </div>
        </div>
<div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type.name}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${
    offers.map((element) => (
      `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
              <label class="event__offer-label" for="event-offer-luggage-1">
                <span class="event__offer-title">${element.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${element.price}</span>
              </label>
            </div>`
    )).join('')
    }
          </div>
        </section>
        <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${destination.map((items) => (
      `<p class="event__destination-description">${items.pictures.description}</p>`)).join('')}
                    <div class="event__photos-container">
                    ${destination.map((item) => (
      `<div class="event__photos-tape">
      <img class="event__photo" src="${item.pictures.src}" alt="Event photo">`
    )).join('')
    }
                    </div>
                  </div>
                    </section>
    </form>
  </li>`
  );
}
export default class EditPointView extends AbstractView {
  #data = null;
  #handleSubmit = null;

  constructor({ data , onSubmitClick }) {
    super();
    this.#data = data;
    this.#handleSubmit = onSubmitClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#submitHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#submitHandler);
  }

  get template() {
    return editPointTemplate(this.#data);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(this.#data);
  };
}
