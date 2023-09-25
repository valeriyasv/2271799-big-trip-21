import flatpickr from 'flatpickr';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TYPES } from '../const';
import dayjs from 'dayjs';

import 'flatpickr/dist/flatpickr.min.css';
function createTypesTemplate (point) {
  return (
    `<fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${
    TYPES.map((item) => (
      `<div class="event__type-item">
                <input id="event-type-${item.name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.name.toLowerCase()}" ${point.name.toLowerCase() === item.name.toLowerCase() ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${item.name.toLowerCase()}" for="event-type-${item.name.toLowerCase()}-1">${item.name}</label>
              </div>`)).join('')}
  </fieldset>
    `
  );
}

function createDestinationTemplate (point) {
  return (
    `
    <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(point.dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(point.dateTo).format('DD/MM/YY HH:mm')}">
        </div>`
  );
}

function createPriceTemplate (point) {
  return (
    `
    <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
        </div>`
  );
}

function createOffersTemplate (point) {
  return (
    `
    <div class="event__available-offers">
          ${
    point.offers.map((element) => (
      `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${element.title}-1" type="checkbox" name="event-offer-${element.title}" ${element.checked ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-${element.title}-1">
                <span class="event__offer-title">${element.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${element.price}</span>
              </label>
            </div>`
    )).join('')
    }
          </div>`
  );
}

function createDescriptionTemplate (point) {
  return (
    `
    ${point.destination.map((items) => (
      `<p class="event__destination-description">${items.pictures.description}</p>`)).join('')}
                    <div class="event__photos-container">
                    ${point.destination.map((item) => (
      `<div class="event__photos-tape">
      <img class="event__photo" src="${item.pictures.src}" alt="Event photo">`
    )).join('')
    }
                    </div>
                  </div>`
  );
}
function editPointTemplate ({state}) {
  const {data} = state;
  return (
    ` <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="${state.type.img}" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                ${createTypesTemplate(data)}
              </div>
            </div>
            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${state.type.name}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${state.name}" list="destination-list-1">
              <datalist id="destination-list-1">
                <option value="Amsterdam"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
              </datalist>
            </div>

            ${createDestinationTemplate(data)}

            ${createPriceTemplate(data)}

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              ${createOffersTemplate(data)}

            </section>
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>

              ${createDescriptionTemplate(data)}

            </section>
        </form>
      </li>`
  );
}
export default class EditPointView extends AbstractStatefulView {
  #data = null;
  #handleSubmit = null;
  #pointDestinations = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ data, pointDestinations, onSubmitClick }) {
    super();
    this._state = data;
    this.#pointDestinations = pointDestinations;
    this.#handleSubmit = onSubmitClick;

    this._setState(EditPointView.parsePointToState({data}));

    this._restoreHandlers();
  }

  get template() {
    return editPointTemplate({
      state: this._state
    });
  }

  reset = (data) => this.updateElement({data});

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  _restoreHandlers = () => {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#submitHandler);

    this.element.querySelector('form')
      .addEventListener('submit', this.#submitHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickers();
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      data: {
        ...this._state.data,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#pointDestinations
      .find((pointDestination) => pointDestination.name === evt.target.value);

    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;

    this.updateElement({
      data: {
        ...this._state.data,
        destination: selectedDestinationId
      }
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      data: {
        ...this._state.data,
        offers: checkedBoxes.map((element) => element.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      data: {
        ...this._state.data,
        price: evt.target.valueAsNumber
      }
    });
  };

  #dateFromCloserHandler = ([userDate]) => {
    this._setState({
      data: {
        ...this._state.data,
        dateFrom: userDate
      }
    });
    this.#datepickerTo.set('minDate', this._state.data.dateFrom);
  };

  #dateToCloserHandler = ([userDate]) => {
    this._setState({
      data: {
        ...this._state.data,
        dateTo: userDate
      }
    });
    this.#datepickerFrom.set('maxDate', this._state.data.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.data.dateFrom,
        onClose: this.#dateFromCloserHandler,
        maxDate: this._state.data.dateTo,
      },
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.data.dateTo,
        onClose: this.#dateToCloserHandler,
        minDate: this._state.data.dateFrom,
      },
    );
  };

  static parsePointToState = ({data}) => ({data});

  static parseStateToPoint = (state) => state.data;
}
