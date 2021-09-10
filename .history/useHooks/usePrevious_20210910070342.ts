import { useEffect, useRef } from "react";
import useInitialRender from "./useInitialRender";

const usePrevious = <T>(
  value: T,
  afterInitialRender: boolean = false
): typeof value => {
  const previousRef = useRef(null);
  const renderCount = useInitialRender();
  useEffect((): void => {
    if (afterInitialRender && renderCount < 1) {
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
