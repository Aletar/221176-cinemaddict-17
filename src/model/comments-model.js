import { generateComment } from '../mock/data.js';

export default class CommentsModel {

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
}
