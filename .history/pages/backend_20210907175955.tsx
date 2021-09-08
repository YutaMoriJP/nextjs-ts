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

const fetchToDoList = async (): Promise<Res> => {
  console.log("%c fetchToDoList runs", "color: seagreen; font-size:20px");
  try {
    const res = await window.fetch("/api/");
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
  console.log(result);
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
