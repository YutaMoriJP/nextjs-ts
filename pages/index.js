import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("HOME was mounted");
    return () => {
      console.log("HOME WAS UNMOUNTED");
    };
  }, []);
  return <></>;
};

export default Home;
