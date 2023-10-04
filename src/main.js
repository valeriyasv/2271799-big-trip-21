import {render, RenderPosition } from './framework/render.js';
import PointsModel from './model/points-model.js';
import InfoView from './view/info-view.js';
import NewEventButton from './view/new-event-button.js';
import FilterModel from './model/filters-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ContainerPresenter from './presenter/presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import PointsApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic hS2sf044wcl3sa44j';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const mainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const filterElement = document.querySelector('.trip-controls__filters');

const apiService = new PointsApiService(END_POINT, AUTHORIZATION);

const modelDestinations = new DestinationsModel(apiService);
const modelOffers = new OffersModel(apiService);
const modelPoints = new PointsModel({
  pointsApiService: apiService,
  modelDestinations,
  modelOffers
});
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
  onNewPointDestroy: handleNewPointFormClose,
  offers: modelOffers,
  destinations: modelDestinations
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

render(new InfoView(), mainElement, RenderPosition.AFTERBEGIN);
render(newPointButtonComponet, mainElement);

presenter.init();
filterPresenter.init();
modelPoints.init();
