import { useEffect, useState } from "react";
import { useAuth } from "../stores/authContext";
import CardContainer from "../component/Card/CardContainer";
import styles from "../styles/Home.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import useLocalStorage from "../useHooks/useLocalStorage";
import useInitialRender from "../useHooks/useInitialRender";
import usePrevious from "../useHooks/usePrevious";

//data is requested and returned from netlify function, but it's only returned when user is authorized(logged in)
type Data = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type Res = {
  data: Data[];
  msg: string;
  loggedIn: true;
};

type IndexData =
  | {
      data: Data[];
      msg: string;
      loggedIn: true;
      loading: false;
    }
  | {
      data: [];
      msg: string;
      loggedIn: false;
      loading: false;
    }
  | {
      data: null;
      msg: string;
      loggedIn: false;
      loading: false;
    }
  | {
      data: null;
      msg: string;
      loggedIn: false;
      loading: true;
    };

const storageKey = "netlify_identity_user_data";

const Home = (): JSX.Element => {
  const { user, authReady } = useAuth();
  const previousUser = usePrevious(user);
  console.log("user", user);
  const [{ data, msg, loggedIn, loading }, setData] = useState<IndexData>({
    data: null,
    msg: "",
    loggedIn: false,
    loading: false,
  });

  useLocalStorage(storageKey, data, setData);

  const renderCount = useInitialRender();

  useEffect((): (() => void) => {
    let isCanceled = false;
    console.log("useEffect user", user);

    const asyncReq = async (): Promise<void> => {
      setData({ data: null, msg: "", loggedIn: false, loading: true });
      try {
        const controller = new AbortController();
        const signal = controller.signal; //used to cancel fetch request
        //only pass the headers object if the user is logged in
        const headers = new Headers(
          user ? { Authorization: `Bearer ${user.token.access_token}` } : {}
        );
        //only pass the query string loggedIn=true, if user is authorized
        const queryStrings = headers.has("Authorization")
          ? "?loggedIn=true"
          : "?loggedIn=false";
        const res: Response = await fetch(
          "/.netlify/functions/authenticate" + queryStrings,
          {
            method: "GET",
            headers,
            signal,
          }
        );
        const data: Res = await res.json();
        //if component unmounts, then isCanceled will point to true, which makes !isCanceled false
        //used to make sure that state does not get updated in an unmounted component
        if (!isCanceled) {
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
        <article className={styles.alertContainer}>
          <p className={styles.alert} role="alert">
            {msg}
          </p>
        </article>
      )}

      {loggedIn && (
        <>
          <p className={styles.text}>
            Dummy data returned from{" "}
            <code className={styles.code}>
              https://jsonplaceholder.typicode.com/comments/
            </code>
          </p>
          <CardContainer data={data} />
        </>
      )}
    </>
  );
};

export default Home;
