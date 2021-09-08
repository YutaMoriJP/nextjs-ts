import { useEffect } from "react";
import { useQuery } from "react-query";

interface Res {
  success: boolean;
  msg: string;
}

const fetchToDoList = async (): Promise<Res> => {
  try {
    const res = await window.fetch("/api/");
    const data: Res = await res.json();
    return data;
  } catch (error) {}
};

const Api = (): JSX.Element => {
  useEffect(() => {
    fetch("/api/")
      .then(res => {
        const headers = res.headers;
        console.log(headers);
        console.log(headers.get("Content-Type"));
        if (headers.get("Content-Type").includes("application/json")) {
          console.log("is json");
          return res.json();
        }
        return res.text();
      })
      .then(data => console.log(data));
  }, []);
  return <h1>API PAGE</h1>;
};

export default Api;
