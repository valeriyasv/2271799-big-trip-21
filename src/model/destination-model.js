import { mockDestination } from '../mock/destination';

export default class DestinationModel {
  #destination = mockDestination;

  get destination() {
    return this.#destination;
  }
}
