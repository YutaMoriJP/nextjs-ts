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

//delay network request to test isLoading state of useQuery
const delay = (fn: Function, ms: number): Promise<Response> => {
  return new Promise(res => {
    setTimeout((): void => {
      res(fn());
    }, ms);
  });
};

const fetchToDoList = async (): Promise<Res> => {
  try {
    console.log("fetching has started");
    //delay() delays the request by 5000ms
    const res = await delay(
      (): Promise<Response> =>
        window.fetch("/api/", {
          method: "GET",
          headers: {
            Authorization: "basic",
            "Content-Type": "application/json",
          },
        }),
      5000
    );
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
  //api is the unique query and fetchToDoList is the function that takes care of the data fetching
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    "api",
    fetchToDoList
  );
  return (
    <>
      <h1>API PAGE</h1>
      {isLoading && <p>loading...</p>}
      {isError && <p>{error}</p>}
      {isSuccess && JSON.stringify(data)}
      <APIChild />
    </>
  );
};
//a simple fetching component
const APIChild = (): JSX.Element | string => {
  console.log("APIChild renders");
  const [customData, setCustomData] = useState(null);
  useEffect(() => {
    console.log("APIChild effect runs");
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
  return JSON.stringify(customData);
};
export default Api;
