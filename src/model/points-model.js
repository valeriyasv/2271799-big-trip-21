import { mockPoint } from '../mock/point';
export default class PointsModel {
  #points = mockPoint;

  get points() {
    return this.#points;
  }
}
