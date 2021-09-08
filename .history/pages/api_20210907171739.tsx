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
  return <h1>API PAGE</h1>;
};

export default Api;
