import { useEffect } from "react";
import usePrevious from "./usePrevious";

const deserialize = (key: string) => {
  const storedItem = localStorage.getItem(key);
  try {
    return JSON.parse(storedItem);
  } catch (error) {
    return storedItem;
  }
};

const serialize = (key: string, value: any) => {
  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

type Option = { serialize: typeof serialize; deserialize: typeof deserialize };

const useLocalStorage = (
  key: string,
  value: any,
  option: Option = { serialize, deserialize }
): { remove: () => void; deserialize: typeof deserialize } => {
  const previousKey = usePrevious(key);
  useEffect((): void => {
    if (previousKey !== key) {
      console.log("key has changed, so previous entry is deleted");
      localStorage.removeItem(previousKey);
    }
    option.serialize(key, value);
  }, [key, value]);
  return {
    remove: (): void => localStorage.removeItem(key),
    deserialize: option.deserialize,
  };
};

export default useLocalStorage;
