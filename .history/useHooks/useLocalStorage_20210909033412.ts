import { useEffect } from "react";
import usePrevious from "./usePrevious";
import { serialize, deserialize } from "../util/localStorage";

type Option = { serialize: typeof serialize; deserialize: typeof deserialize };

const useLocalStorage = (
  key: string,
  value: any,
  setState?: React.Dispatch<React.SetStateAction<any>>,
  option: Option = { serialize, deserialize }
): {
  remove: () => void;
  deserialize: typeof deserialize;
  serialize: typeof serialize;
} => {
  //used to check if key value has changed
  const previousKey = usePrevious(key);
  useEffect((): void => {
    if (!setState) return;
    //obtain stored value from localstorage
    //can't lazy load in useState when using localStorage in NextJS
    //so set initial state inside useEffect where localStorage is run in browser and available
    const storedItem = option.deserialize(key);
    if (storedItem === null) {
      //if storedItem points at null, it means nothing was stored
      setState(value);
    } else {
      //this block only runs if localStorage had some data
      setState(storedItem);
    }
  }, []);

  useEffect((): void => {
    if (value === null) return;
    if (previousKey !== key) {
      //key value has changed, so remove previous storage
      window.localStorage.removeItem(previousKey);
    }
    //set storage with new value
    setState && setState(value);
    option.serialize(key, value);
  }, [key, value]);

  return {
    remove: (): void => {
      window.localStorage.removeItem(key);
    },
    deserialize: option.deserialize,
    serialize: option.serialize,
  };
};

export default useLocalStorage;
