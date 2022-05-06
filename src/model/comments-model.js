import { generateComment } from '../mock/comment.js';

export default class FilmsModel {
  comments = Array.from({length: 4}, generateComment);

  getComments() {
    return this.comments;
  }
}
