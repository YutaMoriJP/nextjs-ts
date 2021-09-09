import { useEffect } from "react";
import usePrevious from "./usePrevious";

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
