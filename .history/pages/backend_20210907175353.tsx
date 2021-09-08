import { useEffect } from "react";
import { useQuery } from "react-query";
import Logger from "../component/Logger";

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
  console.log(
    "%c <API /> renders",
    "color: seagreen; font-size: 20px; font-weight: 900"
  );
  const result = useQuery("api", fetchToDoList);

  console.log(
    "%c useQuery result",
    "color: seagreen; font-size: 20px; font-weight: 900",
    result
  );
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
      <Logger name="<API />" />
      <h1>API PAGE</h1>
    </>
  );
};

export default Api;
