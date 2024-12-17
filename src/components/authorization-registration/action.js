function setTokenLocalStorage(token) {
  const userToken = JSON.stringify(token.trim());
  localStorage.setItem("token", userToken);
}

export { setTokenLocalStorage };
