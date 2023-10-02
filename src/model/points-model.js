import { mockPoint } from '../mock/point';
import Observable from '../framework/observable';

export default class PointsModel extends Observable {
  #points = mockPoint;

  get points() {
    return this.#points;
  }

  updatePoint(updatedPoint) {
    return updatedPoint;
  }

  addPoint(data) {
    return {...data, id: crypto.randomUUID()};
  }

  deletePoint() {

  }
}
