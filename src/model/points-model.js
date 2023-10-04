import Observable from '../framework/observable';
import { UpdateType } from '../const';
import { adaptToClient } from '../const';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #modelDestinations = null;
  #modelOffers = null;

  constructor({pointsApiService, modelDestinations, modelOffers}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#modelDestinations = modelDestinations;
    this.#modelOffers = modelOffers;
  }


  async init() {
    try {
      await Promise.all([
        this.#modelDestinations.init(),
        this.#modelOffers.init()
      ]);
      const points = await this.#pointsApiService.points;
      this.#points = points.map(adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}
