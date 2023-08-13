import {createElement} from '../render.js';
import { editPointTemplate } from '../template/edit-point-template.js';

export default class EditPointView {
  getTemplate() {
    return editPointTemplate();
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
