import { useEffect, useRef } from "react";

const usePrevious = (value: string) => {
  const previousRef = useRef(null);
  useEffect((): void => {
    console.log("usePrevious effect is called");
    previousRef.current = value;
  }, [value]);
  return previousRef.current;
};

export default usePrevious;
