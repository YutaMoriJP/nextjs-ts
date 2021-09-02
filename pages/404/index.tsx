import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const NotFound = () => {
  const timerRef = useRef<NodeJS.Timeout>();
  const router = useRouter();
  useEffect(() => {
    console.log("NotFound was mounted");
    timerRef.current = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => {
      console.log("NotFound was unmounted");
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <h1>
        The page <span style={{ background: "grey" }}>{router.pathname}</span>{" "}
        was not found :/
      </h1>
    </>
  );
};

export default NotFound;
