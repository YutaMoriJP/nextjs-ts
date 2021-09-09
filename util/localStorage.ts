export const deserialize = (key: string): any => {
  const storedItem = window.localStorage.getItem(key);
  try {
    return JSON.parse(storedItem);
  } catch (error) {
    return storedItem;
  }
};

export const serialize = (key: string, value: any): void => {
  if (typeof value === "object") {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    window.localStorage.setItem(key, value);
  }
};
