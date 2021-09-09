import React, { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";
import CardContainer from "../Card/CardContainer";
import styles from "../../styles/Home.module.css";
const storageKey = "netlify_identity_user_data";

const User = ({ data, loggedIn }): JSX.Element => {
  const [renderData, setRenderData] = useState(() => data);
  useLocalStorage(storageKey, data, {
    setState: setRenderData,
    state: renderData,
  });
  console.log("data in User is", data);

  console.log("data in User is", data);

  return (
    <>
      <div>
        <p className={styles.text}>
          Dummy data returned from{" "}
          <code className={styles.code}>
            https://jsonplaceholder.typicode.com/comments/
          </code>
        </p>
        {renderData && <CardContainer data={renderData} />}
      </div>
    </>
  );
};

export default User;
