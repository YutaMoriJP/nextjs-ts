import { useEffect } from "react";

const api = (): JSX.Element => {
  useEffect((): void => {
    window.fetch("/api/");
  }, []);
  return <div></div>;
};

export default api;
