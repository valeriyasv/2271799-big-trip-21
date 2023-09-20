import { mockPoint } from '../mock/point';
export default class PointsModel {
  points = mockPoint;

  getPoints() {
    return this.points;
  }
}
