import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class TasksApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptFilmToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  getComments = async (film) =>
    this._load({url: `movies/${film.id}`})
      .then(ApiService.parseResponse);

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptCommentToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptFilmToServer = (film) => ({
    'id': film.id,
    'comments': film.comments,
    'film_info': {
      'title': film.filmInfo.title,
      'alternative_title': film.filmInfo.alternativeTitle,
      'total_rating': film.filmInfo.totalRating,
      'poster': film.filmInfo.poster,
      'age_rating': film.filmInfo.ageRating,
      'director': film.filmInfo.director,
      'writers': film.filmInfo.writers,
      'actors': film.filmInfo.actors,
      'release': {
        'date': film.filmInfo.release.date,
        'release_country': film.filmInfo.release.releaseCountry,
      },
      'runtime': film.filmInfo.runtime,
      'genre': film.filmInfo.genre,
      'description': film.filmInfo.description,
    },
    'user_details': {
      'watchlist': film.userDetails.watchlist,
      'already_watched': film.userDetails.alreadyWatched,
      'watching_date': film.userDetails.watchingDate,
      'favorite': film.userDetails.favorite
    }
  });

  #adaptCommentToServer = (comment) => ({
    'comment': comment.comment,
    'emotion': comment.emotion
  });

}
