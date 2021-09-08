import { useEffect } from "react";

const Api = (): JSX.Element => {
  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);
  return <h1>API PAGE</h1>;
};

export default Api;
