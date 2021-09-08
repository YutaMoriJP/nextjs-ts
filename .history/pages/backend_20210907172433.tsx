import { useEffect } from "react";
import { useQuery } from "react-query";

interface Res {
  success: boolean;
  msg: string;
}

const fetchToDoList = async (): Promise<Res> => {
  try {
    const res = await window.fetch("/api/");
  } catch (error) {}
};

const Api = (): JSX.Element => {
  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);
  return <h1>API PAGE</h1>;
};

export default Api;
