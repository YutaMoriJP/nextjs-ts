import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import style from "./styles.module.css";

const NotFound = () => {
  const timerRef = useRef<NodeJS.Timeout>();
  const router = useRouter();
  useEffect(() => {
    console.log("NotFound was mounted");
    //setTimeout runs after 8 seconds, and calls router.push, which re-directs user to the home page
    timerRef.current = setTimeout(() => {
      router.push("/");
    }, 8000);
    return () => {
      console.log("NotFound was unmounted");
      //clears timer if user navigates to another page, which calls the clean function here
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <article className={style.container}>
        <h1>
          The page{" "}
          <span style={{ background: "#3f5f5f", color: "black" }}>
            {router.asPath}
          </span>{" "}
          was not found.
        </h1>
      </article>
    </>
  );
};

export default NotFound;
