import {render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import InfoView from './view/info-view.js';
import NewEventButton from './view/new-event-button.js';
import FilterModel from './model/filters-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ContainerPresenter from './presenter/presenter.js';

const mainElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const modelPoints = new PointsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel,
  pointsModel: modelPoints,
});


const presenter = new ContainerPresenter({
  container: tripEventsElement,
  points: modelPoints,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});


const newPointButtonComponet = new NewEventButton({
  onClick: handleNewPointButtonClick
});

function handleNewPointButtonClick() {
  presenter.createPoint();
  newPointButtonComponet.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponet.element.disabled = false;
}

render(new InfoView(), mainElement);
render(newPointButtonComponet, mainElement);

filterPresenter.init();
presenter.init();
