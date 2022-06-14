import Observable from '../framework/observable.js';
import { generateComment, newComment } from '../mock/data.js';

export default class CommentsModel extends Observable {

  #comments = new Map();

  commentsByIDs = (filmID, arrayOfID) => {
    const result = [];
    for (const id of arrayOfID) {
      const key = filmID + id;
      if (this.#comments.has(key)) {
        result.push(this.#comments.get(key));
      } else {
        const comment = generateComment(id);
        this.#comments.set(key, comment);
        result.push(comment);
      }
    }
    return result;
  };

  addComment = (updateType, update) => {

    const comment = newComment(update);

    const key = update.filmID + comment.id;
    this.#comments.set(key, comment);

    this._notify(updateType, comment);

    return comment;
  };

  deleteComment = (updateType, update) => {
    const key = update.filmID + update.id;
    if (this.#comments.has(key)) {
      this.#comments.delete(key);
    }

    this._notify(updateType);
  };
}
