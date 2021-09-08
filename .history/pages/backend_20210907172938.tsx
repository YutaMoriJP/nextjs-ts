import { useEffect } from "react";
import { useQuery } from "react-query";

interface Res {
  success: boolean;
  msg: string;
}

const fetchToDoList = async (): Promise<Res> => {
  try {
    const res = await window.fetch("/api/");
    const headers = res.headers.get("Content-Type");
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
        return res.json();
      })
      .then(data => console.log(data));
  }, []);
  return <h1>API PAGE</h1>;
};

export default Api;
