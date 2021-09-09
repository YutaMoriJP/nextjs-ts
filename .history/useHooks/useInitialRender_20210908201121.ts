import { useEffect, useRef } from "react";

const useInitialRender = () => {
  console.log("useInitialRender");
  const renderCountRef = useRef(0);
  useEffect(() => {
    renderCountRef.current++;
  });
  return renderCountRef.current;
};

export default useInitialRender;
