import {createElement} from '../render.js';
import { createPointList } from '../template/point-list-template.js';

export default class PointListView {
  getTemplate() {
    return createPointList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
