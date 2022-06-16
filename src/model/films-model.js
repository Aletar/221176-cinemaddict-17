import Observable from '../framework/observable.js';
import { generateFilm } from '../mock/data.js';

export default class FilmsModel extends Observable {
  #films = Array.from({length: 12}, generateFilm);

  get films() {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  #adaptToClient = (film) => ({
    id: film['id'],
    comments: film['comments'],
    filmInfo: {
      title: film['film_info']['title'],
      alternativeTitle: film['film_info']['alternative_title'],
      totalRating: film['film_info']['total_rating'],
      poster: film['film_info']['poster'],
      ageRating: film['film_info']['age_rating'],
      director: film['film_info']['director'],
      writers: film['film_info']['writers'],
      actors: film['film_info']['actors'],
      release: {
        date: film['film_info']['release.date'],
        releaseCountry: film['film_info']['release.release_country']
      },
      runtime: film['film_info']['runtime'],
      genre: film['film_info']['genre'],
      description: film['film_info']['description'],
    },
    userDetails: {
      watchlist: film['user_details']['watchlist'],
      alreadyWatched: film['user_details']['already_watched'],
      watchingDate: film['user_details']['watching_date'],
      favorite: film['user_details']['favorite'],
    }
  });

}
