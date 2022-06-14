const Mode = {
  DEFAULT: 'DEFAULT',
  DETAIL: 'DETAIL'
};

const sortByDate = (filmA, filmB) => {
  if (filmA.filmInfo.release.date === filmB.filmInfo.release.date) {
    return 0;
  } else if (filmA.filmInfo.release.date > filmB.filmInfo.release.date) {
    return 1;
  } else {
    return -1;
  }
};

const sortByRating = (filmA, filmB) => {
  if (filmA.filmInfo.totalRating === filmB.filmInfo.totalRating) {
    return 0;
  } else if (filmA.filmInfo.totalRating > filmB.filmInfo.totalRating) {
    return 1;
  } else {
    return -1;
  }
};

const addComment = (film, comment) => {
  film.comments.push(comment.id);
};

const deleteComment = (film, comment) => {
  const index = film.comments.findIndex((id) => id === comment.id);

  if (index === -1) {
    return;
  }

  film.comments = [
    ...film.comments.slice(0, index),
    ...film.comments.slice(index + 1),
  ];
};

export { Mode, sortByDate, sortByRating, addComment, deleteComment };
