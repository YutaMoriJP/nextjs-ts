import { useEffect, useRef } from "react";

const useLocalStorage = (key: string, value: any) => {
  const prevKey = useRef<string>(null);
  useEffect(() => {
    if (prevKey.current !== key) {
      localStorage.removeItem(prevKey.current);
    }
    localStorage.setItem(key, value);
    prevKey.current = key;
  }, []);
};

export default useLocalStorage;
