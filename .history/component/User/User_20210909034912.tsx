import React, { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";
import CardContainer from "../Card/CardContainer";
import styles from "../../styles/Home.module.css";
import { Data } from "../../pages/index";
import { useAuth } from "../../stores/authContext";
const storageKey = "netlify_identity_user_data";

export interface UserProps {
  data: Data[];
}

const User = ({ data }: UserProps): JSX.Element => {
  const { user } = useAuth(); //if user points at null, then the user is NOT logged in
  //so don't render the component below
  const [renderData, setRenderData] = useState(() => data);
  useLocalStorage(storageKey, data, setRenderData);
  return (
    <>
      {user && (
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
