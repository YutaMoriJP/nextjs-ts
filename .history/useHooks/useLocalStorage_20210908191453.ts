import { useEffect, useRef, useState } from "react";

const useLocalStorage = (key: string, value: any) => {
  const prevKey = useRef<string>(null);
  useEffect(() => {
    if (prevKey.current !== key) {
      localStorage.removeItem(prevKey.current);
    }
    localStorage.setItem(key, value);
  }, []);
};

export default useLocalStorage;
