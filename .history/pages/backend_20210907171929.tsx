import { useEffect } from "react";

const Api = (): JSX.Element => {
  useEffect(() => {
    fetch("/api/").then(res => console.log(res));
  }, []);
  return <h1>API PAGE</h1>;
};

export default Api;
