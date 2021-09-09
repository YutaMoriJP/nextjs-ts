import { useEffect, useState } from "react";
import usePrevious from "./usePrevious";
import { serialize, deserialize } from "../util/localStorage";
import useInitialRender from "./useInitialRender";

type Option = { serialize: typeof serialize; deserialize: typeof deserialize };

const useLocalStorage = (
  key: string,
  value: any,
  setState?: (data: any) => void,
  option: Option = { serialize, deserialize }
): {
  remove: () => void;
  deserialize: typeof deserialize;
  serialize: typeof serialize;
} => {
  //used to check if key value has changed
  const previousKey = usePrevious(key);
  //avoid setting localStorage in initial render
  const renderCount = useInitialRender();

  useEffect((): void => {
    //obtain stored value from localstorage
    const storedItem = deserialize(key);
    if (storedItem === null) {
      //if storedItem points at null, it means nothing was stored
      setState(Array.from({ length: 500 }, (_, index): number => index + 1));
    } else {
      //this block only runs if localStorage had some data
      setState(storedItem);
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
  };
};

export default useLocalStorage;
