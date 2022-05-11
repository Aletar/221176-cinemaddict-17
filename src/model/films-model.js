import { generateFilm } from '../mock/data.js';

export default class FilmsModel {
  #films = Array.from({length: 12}, generateFilm);

  get films() {
    return this.#films;
  }
}
