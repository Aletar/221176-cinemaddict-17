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

export { sortByDate, sortByRating };
