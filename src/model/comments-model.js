import { generateComment } from '../mock/data.js';

export default class FilmsModel {
  #comments = Array.from({length: 4}, generateComment);

  get comments() {
    return this.#comments;
  }
}
