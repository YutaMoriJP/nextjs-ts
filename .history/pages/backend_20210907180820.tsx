import { useEffect, useState } from "react";
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
    setTimeout((): void => {
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
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    "api",
    fetchToDoList
  );
  const [customData, setCustomData] = useState(null);
  useEffect(() => {
    fetch("/api/")
      .then(res => {
        const headers = res.headers;
        if (headers.get("Content-Type").includes("application/json")) {
          return res.json();
        }
        return res.text();
      })
      .then(setCustomData);
  }, []);
  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>{error}</p>;
  if (isSuccess)
    return (
      <>
        <p>{JSON.stringify(data)}</p>
        <p>{JSON.stringify(customData)}</p>
      </>
    );
  return (
    <>
      <h1>API PAGE</h1>
    </>
  );
};

export default Api;
