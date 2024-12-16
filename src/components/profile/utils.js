const createFetchUrl = (page = 1) => {
  const baseUrl = "https://api.themoviedb.org/3/discover/";
  const fetchUrl = `${baseUrl}movie?include_adult=false&include_video=false&language=ru&page=${page}&sort_by=popularity.desc`;
  console.log(fetchUrl);

  return fetchUrl;
};

export { createFetchUrl };
