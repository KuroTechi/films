const token = JSON.parse(localStorage.getItem("token"));

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

async function querySearchMovies(movieName, page) {
  console.log(movieName.trim());
  
  if(!movieName.trim()){
    return
  }
  const uriMovieName = encodeURIComponent(movieName.trim())
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${uriMovieName}&include_adult=false&language=ru&page=${page}`,
      options
    );
    console.log(response.url);
    if (!response.ok) {
      throw new Error(
        `Произошла ошибка при запросе фильма по названию. Статус: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Ошибка при запросе фильма по названию, нет доступа к серверу: ${error.message}`
    );
    return null;
  }
}

export { querySearchMovies };
