
const token = JSON.parse(localStorage.getItem('token'))

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${token}`
  },
};

async function queryGenres() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=ru",
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
    console.error("Ошибка в запросе жанров для селекта:", error.message);
    return null;
  }
}

export { queryGenres};
