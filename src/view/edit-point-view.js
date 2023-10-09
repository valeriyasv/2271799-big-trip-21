import _ from 'lodash';
import flatpickr from 'flatpickr';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {TYPES} from '../const';
import dayjs from 'dayjs';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';
// import { cond } from 'lodash';

const BLANK_POINT = {
  basePrice: '0',
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

function createTypesTemplate(point) {
  return (
    `
    ${
    TYPES.map((item) => (
      `<div class="event__type-item">
          <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
          value="${item.toLowerCase()}" ${point.toLowerCase() === item.toLowerCase() ? 'checked' : ''}>
          <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
        </div>`)).join('')}
    `
  );
}

function createTimeTemplate(point) {
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

function createPriceTemplate(point) {
  return (
    `
    <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            name="event-price"
            type="number"
            pattern="^[ 0-9]+$"
            value="${point.basePrice}">
        </div>`
  );
}

function createCitiesTemplate(destination) {
  return (destination ? destination.map((item) => `
    <option value="${item.name}">${item.name}</option>`) : '');
}

function createOffersTemplate(point, offers) {
  return (
    `
    <div class="event__available-offers">
    ${point
      .map((element) => {
        const activeOffers = offers.includes(element.id) ? 'checked' : '';
        return `
        <div class="event__offer-selector">
                  <input class="event__offer-checkbox
                    visually-hidden"
                    id="event-offer-${element.id}"
                    type="checkbox"
                    name="event-offer-${element.id}"
                    ${activeOffers}
                    data-offer-id=${element.id}>
                  <label class="event__offer-label" for="event-offer-${element.id}">
                    <span class="event__offer-title">${element.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${element.price}</span>
                  </label>
                </div>`;
      })
      .join('')}
          </div>`
  );
}


function createDescriptionTemplate(point) {

  return (
    `<p class="event__destination-description">${point.description}</p>
      <div class="event__photos-container">
      <div class="event__photos-tape">
  ${ point.pictures ?
      point.pictures.map((item) => `
      <img class="event__photo" src="${item.src}" alt="${item.description}">
      `).join('')
      : ''
    }
    </div>
      </div>`
  );
}

function editPointTemplate({state, pointDestinations, pointsOffers}) {
  const {data} = state;
  const {type, offers} = data;
  const pointDestination = pointDestinations ? pointDestinations.find((item) => item.id === data.destination) : [];
  const typeOffers = pointsOffers ? pointsOffers.find((item) => item.type === data.type).offers : [];
  return (
    ` <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
              <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${createTypesTemplate(type)}
              </fieldset>
              </div>
            </div>
            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${type}
              </label>
              <input class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${he.encode(pointDestination.name)}"
              list="destination-list-1">
              <datalist id="destination-list-1">
                ${createCitiesTemplate(pointDestinations)}
              </datalist>
              </div>

              ${createTimeTemplate(data)}

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

                ${createOffersTemplate(typeOffers, offers)}

              </section>
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>

              ${createDescriptionTemplate(pointDestination)}

            </section>
        </form>
      </li>`
  );
}
export default class EditPointView extends AbstractStatefulView {
  #handleSubmit = null;
  #clickResetHandler = null;
  #pointDestinations = null;
  #pointsOffers = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDelete = null;
  #nameDestination = null;

  constructor(
    {
      data = BLANK_POINT,
      pointDestinations,
      onSubmitClick,
      clickResetHandler,
      onDeleteClick,
      pointsOffers
    }) {
    super();
    this._state = data;
    this._setState(EditPointView.parsePointToState({data}));
    this.#pointDestinations = pointDestinations;
    this.#handleSubmit = onSubmitClick;
    this.#clickResetHandler = clickResetHandler;
    this.#handleDelete = onDeleteClick;
    this.#pointsOffers = pointsOffers;
    this._restoreHandlers();
  }

  get template() {
    return editPointTemplate({
      state: this._state,
      pointDestinations: this.#pointDestinations,
      pointsOffers: this.#pointsOffers
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
      .addEventListener('click', this.#clickResetHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);

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
    // console.log()
    evt.preventDefault();
    this.#handleSubmit(EditPointView.parseStateToPoint(this._state));
  };


  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDelete(this._state.data);
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      data: {
        ...this._state.data,
        type: evt.target.value,
        offer: [],
      },
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#pointDestinations ? this.#pointDestinations.find((pointDestination) => pointDestination.name === _.capitalize(evt.target.value)) : '';
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : this._state.data.destination;

    this.updateElement({
      data: {
        ...this._state.data,
        destination: selectedDestinationId,
      }
    });
  };

  #offerChangeHandler = () => {
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      data: {
        ...this._state.data,
        offer: checkedBoxes.map((element) => element.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      data: {
        ...this._state.data,
        basePrice: evt.target.valueAsNumber,
        offer: []
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
