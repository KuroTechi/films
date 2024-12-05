const isValidJSON = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

const tokenPattern = /^[a-zA-Z0-9-_\\.]+$/;

const getAndValidateLocalStorageItem = (value) => {
  const item = localStorage.getItem(value);
  if (!item) {
    console.warn("Ключ отсутствует");
    return;
  }

  if (item && isValidJSON(item)) {
    const parsedItem = JSON.parse(item);
    if (tokenPattern.test(parsedItem)) {
      return parsedItem;
    } else {
      console.warn(
        "Значение ключа содержит недопустимые символы. Удаление из LocalStorage."
      );
      localStorage.removeItem(value);
    }
  } else {
    console.warn("Ключ / значение неккоректно. Удаление из LocalStorage.");
    localStorage.removeItem(value);
  }
};

const removeLocalStorageItem = (value) => {
  const item = localStorage.getItem(value);
  if (!item) {
    console.warn("Ключ отсутствует");
    return;
  }
  localStorage.removeItem(value);
};

export { getAndValidateLocalStorageItem, removeLocalStorageItem };
