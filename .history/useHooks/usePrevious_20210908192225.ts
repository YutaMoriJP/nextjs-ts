import { useEffect, useRef } from "react";

const usePrevious = (value: string) => {
  const previousRef = useRef(null);
  useEffect(() => {
    previousRef.current = value;
  }, [value]);
  return previousRef.current;
};

export default usePrevious;
