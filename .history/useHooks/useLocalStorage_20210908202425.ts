import { useEffect, useState } from "react";
import usePrevious from "./usePrevious";
import { serialize, deserialize } from "../util/localStorage";
import useInitialRender from "./useInitialRender";

type Option = { serialize: typeof serialize; deserialize: typeof deserialize };

const useLocalStorage = (
  key: string,
  value: any,
  option: Option = { serialize, deserialize },
  setState: () => void
): {
  remove: () => void;
  deserialize: typeof deserialize;
  serialize: typeof serialize;
  data: any;
} => {
  const previousKey = usePrevious(key);
  const renderCount = useInitialRender();
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedItem = deserialize(key);
    if (storedItem === null) {
      setData(Array.from({ length: 500 }, (_, index): number => index + 1));
    } else {
      setData(storedItem);
    }
  }, []);

  useEffect((): void => {
    //prevent setting storage in initial render
    if (renderCount === 0) {
      console.log("initial render", renderCount);
      return;
    }
    if (previousKey !== key) {
      window.localStorage.removeItem(previousKey);
    }
    option.serialize(key, value);
  }, [key, value]);

  return {
    remove: (): void => window.localStorage.removeItem(key),
    deserialize: option.deserialize,
    serialize: option.serialize,
    data,
  };
};

export default useLocalStorage;
