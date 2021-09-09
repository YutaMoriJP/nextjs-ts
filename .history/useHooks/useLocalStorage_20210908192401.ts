import { useEffect, useRef } from "react";
import usePrevious from "./usePrevious";

const useLocalStorage = (key: string, value: any) => {
  const prevKeyRef = useRef<string>(null);
  const previousKey = usePrevious(key);
  useEffect((): void => {
    console.log("useLocalstorage effect is called");
    console.log("current key is", key);
    console.log("previous key is", previousKey);
    if (prevKeyRef.current !== key) {
      localStorage.removeItem(prevKeyRef.current);
    }
    localStorage.setItem(key, value);
    prevKeyRef.current = key;
  }, []);
};

export default useLocalStorage;
