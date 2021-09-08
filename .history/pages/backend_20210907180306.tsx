import { useEffect } from "react";
import { useQuery } from "react-query";

type Res =
  | {
      success: boolean;
      msg: string;
    }
  | {
      success: boolean;
      error: Error;
    };

const delay = (fn: Function, ms: number): Promise<any> => {
  return new Promise(res => {
    setTimeout(() => {
      res(fn());
    }, ms);
  });
};

const fetchToDoList = async (): Promise<Res> => {
  try {
    console.log("fetching has started");
    const res = await delay(() => window.fetch("/api/"), 5000);
    console.log("fetching has finished");
    const data: Res = await res.json();
    return data;
  } catch (error) {
    console.log("%c useQuery failed result", error);
    return {
      success: false,
      error,
    };
  }
};

const Api = (): JSX.Element => {
  const result = useQuery("api", fetchToDoList);
  console.log("%c useQuery result", "color:skyblue", result);
  useEffect(() => {
    fetch("/api/")
      .then(res => {
        const headers = res.headers;
        if (headers.get("Content-Type").includes("application/json")) {
          return res.json();
        }
        return res.text();
      })
      .then(data => console.log("data", data));
  }, []);
  return (
    <>
      <h1>API PAGE</h1>
    </>
  );
};

export default Api;
