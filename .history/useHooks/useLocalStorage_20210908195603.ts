import { useEffect } from "react";
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
} => {
  const previousKey = usePrevious(key);

  useEffect((): void => {
    if (previousKey !== key) {
      window.localStorage.removeItem(previousKey);
    }
    option.serialize(key, value);
  }, [key, value]);

  return {
    remove: (): void => window.localStorage.removeItem(key),
    deserialize: option.deserialize,
    serialize: option.serialize,
  };
};

export default useLocalStorage;
