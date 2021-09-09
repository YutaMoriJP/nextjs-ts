import React, { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";
import CardContainer from "../Card/CardContainer";
import styles from "../../styles/Home.module.css";
const storageKey = "netlify_identity_user_data";

const User = ({ data, loggedIn }): JSX.Element => {
  const [renderData, setRenderData] = useState(null);
  useLocalStorage(storageKey, data, setRenderData);
  return (
    <>
      {loggedIn && (
        <div>
          <p className={styles.text}>
            Dummy data returned from{" "}
            <code className={styles.code}>
              https://jsonplaceholder.typicode.com/comments/
            </code>
          </p>
          {renderData && <CardContainer data={renderData} />}
        </div>
      )}
    </>
  );
};

export default User;
