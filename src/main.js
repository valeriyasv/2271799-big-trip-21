import InfoView from './view/info-view.js';
import NewEventButton from './view/new-event-button.js';
import FilterView from './view/filter-view.js';
import { render } from './render.js';
import ContainerPresenter from './presenter/presenter.js';

const mainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');

const presenter = new ContainerPresenter({
  container: tripEventsElement
});

render(new InfoView(), mainElement);
render(new FilterView(), mainElement);
render(new NewEventButton(), mainElement);

presenter.init();
