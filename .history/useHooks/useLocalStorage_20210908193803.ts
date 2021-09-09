import { useEffect } from "react";
import usePrevious from "./usePrevious";

const serialize = (key, value) => {
  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

const useLocalStorage = (key: string, value: any) => {
  const previousKey = usePrevious(key);
  useEffect((): void => {
    if (previousKey !== key) {
      console.log("key has changed, so previous entry is deleted");
      localStorage.removeItem(previousKey);
    }
    localStorage.setItem(key, value);
  }, [key, value]);
};

export default useLocalStorage;
