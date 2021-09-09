import { useEffect, useRef } from "react";
import usePrevious from "./usePrevious";

const useLocalStorage = (key: string, value: any) => {
  const prevKey = useRef<string>(null);
  const previousKey = usePrevious(key);
  useEffect((): void => {
    console.log("useLocalstorage effect is called");
    console.log("current key is", key);
    console.log("previous key is");
    if (prevKey.current !== key) {
      localStorage.removeItem(prevKey.current);
    }
    localStorage.setItem(key, value);
    prevKey.current = key;
  }, []);
};

export default useLocalStorage;
