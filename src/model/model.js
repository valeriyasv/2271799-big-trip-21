import { getRandomElement } from '../mock/utils';
import { mockPoint } from '../mock/point';
import { COUNT_POINT } from '../const';

export default class PointsModel {
  points = Array.from({ length: COUNT_POINT }, () => getRandomElement(mockPoint));

  getPoints() {
    return this.points;
  }
}
