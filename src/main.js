import {render} from './framework/render.js';
import PointsModel from './model/model.js';
import InfoView from './view/info-view.js';
import NewEventButton from './view/new-event-button.js';
import FilterView from './view/filter-view.js';
import ContainerPresenter from './presenter/presenter.js';

const mainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const model = new PointsModel();
const presenter = new ContainerPresenter({
  container: tripEventsElement,
  points: model
});

render(new InfoView(), mainElement);
render(new FilterView(), mainElement);
render(new NewEventButton(), mainElement);

presenter.init();
