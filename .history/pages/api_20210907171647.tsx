import { useEffect } from "react";

const Api = (): JSX.Element => {
  useEffect((): void => {
    window
      .fetch("/api/index", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      .then(res => {
        console.log(res);
      });
  }, []);
  return <div></div>;
};

export default Api;
