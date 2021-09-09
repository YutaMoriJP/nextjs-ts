import { useRef } from "react";

const usePrevious = () => {
  const previousRef = useRef(null);

  return previousRef.current;
};

export default usePrevious;
