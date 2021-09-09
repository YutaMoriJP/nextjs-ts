import { useEffect, useRef } from "react";
import useInitialRender from "./useInitialRender";

const usePrevious = (value: string, afterInitialRender: boolean = false) => {
  const previousRef = useRef(null);
  const renderCount = useInitialRender();
  console.log("usePrevious is called");
  useEffect((): void => {
    if (afterInitialRender && renderCount <= 1) {
      console.log("renderCount", renderCount);
      return;
    } else {
      console.log("usePrevious effect is called", renderCount);
      previousRef.current = value;
      console.log("next render key is", previousRef);
    }
  }, [value]);
  return previousRef.current;
};

export default usePrevious;
