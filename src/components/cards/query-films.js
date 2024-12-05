const token = JSON.parse(localStorage.getItem("token"));

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

async function queryMoviesByFilters(url) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `Произошла ошибка при запросе к серверу! Статус: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Ошибка при запросе фильмов по фильтрам, нет доступа к серверу:",
      error.message
    );
    return null;
  }
}

async function queryFavoriteMovies(page) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/20039690/favorite/movies?language=ru&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error(
        `Произошла ошибка при получении избранных фильмов. Статус: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Ошибка при запросе избранных фильмов, нет доступа к серверу:",
      error.message
    );
    return null;
  }
}

async function addFavoriteMovie(movieId, action) {
  const url = "https://api.themoviedb.org/3/account/20039690/favorite";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      favorite: action,
    }),
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        "Произошла ошибка при добавлении/удалении избранного фильма"
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка в запросе к серверу", error.message);
    return null;
  }
}
export { queryMoviesByFilters, queryFavoriteMovies, addFavoriteMovie };
