import { useEffect, useRef } from "react";
import usePrevious from "./usePrevious";

const useLocalStorage = (key: string, value: any) => {
  const previousKey = usePrevious(key);
  useEffect((): void => {
    if (previousKey == key) {
      localStorage.removeItem(previousKey);
    }
    localStorage.setItem(key, value);
  }, [key, value]);
};

export default useLocalStorage;
