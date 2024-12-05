export function getAuthHeaders() {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  if (!token) {
    throw new Error("Токен не найден.");
  }
  return {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function createFetchOptions(method = "GET") {
  return {
    method,
    headers: getAuthHeaders(),
  };
}

export function createFetchPostOptions(movieId, action) {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  if (!token) {
    throw new Error("Токен не найден.");
  }
  return {
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
}
