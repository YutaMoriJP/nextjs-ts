import { useEffect, useState } from "react";
import usePrevious from "./usePrevious";
import { serialize, deserialize } from "../util/localStorage";

type Option = { serialize: typeof serialize; deserialize: typeof deserialize };

const useLocalStorage = (
  key: string,
  value: any,
  option: Option = { serialize, deserialize }
): {
  remove: () => void;
  deserialize: typeof deserialize;
  serialize: typeof serialize;
  data: any;
} => {
  const previousKey = usePrevious(key);
  const [data, setData] = useState(null);
  useEffect((): void => {
    if (previousKey !== key) {
      window.localStorage.removeItem(previousKey);
    }
    option.serialize(key, value);
    setData(value);
  }, [key, value]);

  return {
    remove: (): void => window.localStorage.removeItem(key),
    deserialize: option.deserialize,
    serialize: option.serialize,
    data,
  };
};

export default useLocalStorage;
