import { Data } from "../index";

const asyncReq = async () => {
  const url = "https://jsonplaceholder.typicode.com/users/";
  const res = await fetch(url, { method: "GET" });
  const data: Array<Data> = await res.json();
  return data;
};

export default asyncReq;
