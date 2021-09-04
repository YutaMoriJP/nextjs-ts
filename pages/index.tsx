import { useEffect, useState } from "react";
import { useAuth } from "../stores/authContext";
import CardContainer from "../component/Card/CardContainer";

interface Data {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Res {
  data: Data[];
  msg: string;
  loggedIn: boolean;
}

const Home = () => {
  const { user, authReady } = useAuth();
  const [{ data, msg, loggedIn }, setData] = useState<Res>({
    data: null,
    msg: "",
    loggedIn: false,
  });

  useEffect(() => {
    let isCanceled = false;
    const asyncReq = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        const headers = new Headers(
          user ? { Authorization: `Bearer ${user.token.access_token}` } : {}
        );
        const res = await fetch("/.netlify/functions/authenticate", {
          method: "GET",
          headers,
          signal,
        });
        const data = await res.json();
        if (!isCanceled) {
          console.log(data);
          setData(data);
        }
      } catch (error) {
        if (!isCanceled) {
          console.log(error);
        }
      }
    };
    asyncReq();
    return () => {
      console.log("HOME WAS UNMOUNTED");
      isCanceled = true;
    };
  }, [user, authReady]);
  return (
    <>
      {!loggedIn && <h1>{msg}</h1>}
      {loggedIn && <CardContainer data={data} />}
    </>
  );
};

export default Home;
