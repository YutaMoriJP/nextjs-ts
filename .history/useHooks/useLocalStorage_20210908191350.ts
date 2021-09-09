import { useEffect, useRef } from "react";

const useLocalStorage = (key: string) => {
  const prevKey = useRef<string>(null);

  useEffect(() => {
    if (prevKey.current !== key) {
      localStorage.removeItem(prevKey.current);
    }
  }, []);
};

export default useLocalStorage;
