import FilterView from './view/filter-view.js';
import {render} from './render.js';
import ContainerPresenter from './presenter/presenter.js';

const mainElement = document.querySelector('.main');
const containerPresenter = new ContainerPresenter(mainElement);

render(new FilterView(), mainElement);

containerPresenter.init();
