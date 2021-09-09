import { useRef } from "react";

const usePrevious = (value: string) => {
  const previousRef = useRef(null);
  return previousRef.current;
};

export default usePrevious;
