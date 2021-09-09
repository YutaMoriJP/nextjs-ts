import { useRef } from "react";

const useInitialRender = () => {
  const renderCountRef = useRef(0);
  return renderCountRef.current;
};

export default useInitialRender;
