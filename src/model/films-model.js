import Observable from '../framework/observable.js';
import { generateFilm } from '../mock/data.js';

export default class FilmsModel extends Observable {
  #films = Array.from({length: 12}, generateFilm);

  get films() {
    return this.#films;
  }
}
