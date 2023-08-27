import {createElement} from '../render.js';
import { addPointTemplate } from '../template/add-point-template.js';

export default class AddPointView {
  getTemplate() {
    return addPointTemplate();
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
