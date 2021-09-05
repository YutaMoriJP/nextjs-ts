import { Data } from "../pages/users/index";

export const asyncReq = async (): Promise<Data[]> => {
  const url = "https://jsonplaceholder.typicode.com/users/";
  const res = await fetch(url, { method: "GET" });
  const data: Data[] = await res.json();
  return data;
};
