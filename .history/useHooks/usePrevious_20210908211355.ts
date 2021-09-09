import { useEffect, useRef } from "react";
import useInitialRender from "./useInitialRender";

const usePrevious = (value: string, afterInitialRender: boolean = false) => {
  const previousRef = useRef(null);
  const renderCount = useInitialRender();
  useEffect((): void => {
    console.log("usePrevious effect is called");
    previousRef.current = value;
    console.log("next render key is", previousRef);
  }, [value]);
  return previousRef.current;
};

export default usePrevious;
