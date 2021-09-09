import { useEffect } from "react";
import usePrevious from "./usePrevious";

export const deserialize = (key: string): any => {
  const storedItem = window.localStorage.getItem(key);
  try {
    return JSON.parse(storedItem);
  } catch (error) {
    return storedItem;
  }
};

const serialize = (key: string, value: any): void => {
  if (typeof value === "object") {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    window.localStorage.setItem(key, value);
  }
};

type Option = { serialize: typeof serialize; deserialize: typeof deserialize };

const usewindow.LocalStorage = (
  key: string,
  value: any,
  option: Option = { serialize, deserialize }
): {
  remove: () => void;
  deserialize: typeof deserialize;
  serialize: typeof serialize;
} => {
  const previousKey = usePrevious(key);

  useEffect((): void => {
    if (previousKey !== key) {
      window.localStorage.removeItem(previousKey);
    }
    option.serialize(key, value);
  }, [key, value]);

  return {
    remove: (): void => window.localStorage.removeItem(key),
    deserialize: option.deserialize,
    serialize: option.serialize,
  };
};

export default usewindow.LocalStorage;
