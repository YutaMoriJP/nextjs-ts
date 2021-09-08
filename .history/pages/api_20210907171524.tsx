import { useEffect } from "react";

const api = (): JSX.Element => {
  useEffect((): void => {
    window
      .fetch("/api/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      .then(res => {
        console.log(res);
      });
  }, []);
  return <div></div>;
};

export default api;
