import { useRef } from "react";

const usePrevious = (value: string) => {
  const previousRef = useRef(null);
  useEffect(() => {}, [value]);
  return previousRef.current;
};

export default usePrevious;
