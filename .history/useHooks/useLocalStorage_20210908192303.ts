import { useEffect, useRef } from "react";

const useLocalStorage = (key: string, value: any) => {
  const prevKey = useRef<string>(null);
  useEffect((): void => {
    console.log("useLocalstorage effect is called");
    if (prevKey.current !== key) {
      localStorage.removeItem(prevKey.current);
    }
    localStorage.setItem(key, value);
    prevKey.current = key;
  }, []);
};

export default useLocalStorage;
