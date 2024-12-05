const imageCloudUrl = "https://image.tmdb.org/t/p/w500/";
const movieDbUrl = "https://api.themoviedb.org/3/discover/movie?language=ru";
const movieImgNotFound = "https://www.irisoele.com/img/noimage.png";

const generateUrl = (genres, sortBy, yearsRange, currentPage) => {
  const genresId = genres.map((genre) => genre.id).join(",");
  const baseParams = `page=${currentPage}&primary_release_date.gte=${yearsRange[0]}-01-01&primary_release_date.lte=${yearsRange[1]}-12-12&with_genres=${genresId}`;
  let sortParam;
  switch (sortBy) {
    case "По рейтингу":
      sortParam = "vote_count.desc";
      break;
    case "По популярности":
      sortParam = "popularity.desc";
      break;
    default:
      sortParam = "popularity.desc";
  }
  return `${movieDbUrl}&${baseParams}&sort_by=${sortParam}`;
};

function truncateString(str) {
  if (!str) {
    return "Название не найдено";
  }
  return str.length > 15 ? str.slice(0, 15) + "..." : str;
}

function getImgUrl(movieBackdropImgPath, moviePosterImgPath) {
  if (!movieBackdropImgPath && !moviePosterImgPath) {
    return movieImgNotFound;
  } else {
    return imageCloudUrl + (moviePosterImgPath || movieBackdropImgPath);
  }
}

function formatVoteAverage(number) {
  return number ? number.toFixed(1) : "не указан";
}

export {
  generateUrl,
  imageCloudUrl,
  truncateString,
  getImgUrl,
  formatVoteAverage,
};
