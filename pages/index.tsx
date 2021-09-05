import { useEffect, useState } from "react";
import { useAuth } from "../stores/authContext";
import CardContainer from "../component/Card/CardContainer";
import styles from "../styles/Home.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  loading: boolean;
}

const Home = (): JSX.Element => {
  const { user, authReady } = useAuth();
  const [{ data, msg, loggedIn, loading }, setData] = useState<Res>({
    data: null,
    msg: "",
    loggedIn: false,
    loading: false,
  });

  useEffect((): (() => void) => {
    let isCanceled = false;
    const asyncReq = async (): Promise<void> => {
      setData(prev => ({ ...prev, loading: true }));

      try {
        const controller = new AbortController();
        const signal = controller.signal;
        const headers = new Headers(
          user ? { Authorization: `Bearer ${user.token.access_token}` } : {}
        );
        console.log("has authorization headers", headers.has("Authorization"));

        const queryStrings = headers.has("Authorization")
          ? "?loggedIn=true"
          : "?loggedIn=false";

        const res = await fetch(
          "/.netlify/functions/authenticate" + queryStrings,
          {
            method: "GET",
            headers,
            signal,
          }
        );
        const data = await res.json();
        if (!isCanceled) {
          console.log(data);
          setData({ ...data, loading: false });
        }
      } catch (error) {
        if (!isCanceled) {
          console.log(error);
        }
      }
    };
    asyncReq();
    return (): void => {
      console.log("HOME WAS UNMOUNTED");
      isCanceled = true;
    };
  }, [user, authReady]);

  return (
    <>
      {loading && (
        <article className={styles.center}>
          <CircularProgress color="primary" />
        </article>
      )}
      {!loggedIn && msg && (
        <p className={styles.alert} role="alert">
          {msg}
        </p>
      )}

      {loggedIn && <CardContainer data={data} />}
    </>
  );
};

export default Home;
