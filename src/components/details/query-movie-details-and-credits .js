const token = JSON.parse(localStorage.getItem("token"));

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

async function queryMovieDetails(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ru`,
      options
    );
    if (!response.ok) {
      throw new Error(
        `Произошла ошибка при запросе к серверу! Статус: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка в запросе деталей фильма:", error.message);
    return null;
  }
}

async function queryMovieCredits(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      options
    );
    if (!response.ok) {
      throw new Error(
        `Произошла ошибка при запросе к серверу! Статус: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { queryMovieDetails, queryMovieCredits };
