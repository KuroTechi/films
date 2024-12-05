const TokenValidationStatus = {
  VALID: "valid token",
  INVALID: "invalid token",
  ERROR: "connect API error",
};

function setTokenLocalStorage(token) {
  const userToken = JSON.stringify(token.trim());
  localStorage.setItem("token", userToken);
}
const authenticationUrl = "https://api.themoviedb.org/3/authentication";

async function validateUserAPIKey(key) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const response = await fetch(authenticationUrl, options);
    if (response.ok) {
      return TokenValidationStatus.VALID;
    }
    if (response.status === 401) {
      return TokenValidationStatus.INVALID;
    }
  } catch (error) {
    console.error(
      "Ошибка в проверке токена, нет доступа к серверу: ",
      error.message
    );
    return TokenValidationStatus.ERROR;
  }
}

export { setTokenLocalStorage, validateUserAPIKey };
