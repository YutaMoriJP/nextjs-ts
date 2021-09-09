import React, { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";
import CardContainer from "../Card/CardContainer";

const storageKey = "netlify_identity_user_data";

const User = ({ data }): JSX.Element => {
  const [renderData, setRenderData] = useState(null);
  useLocalStorage(storageKey, data, setRenderData);
  console.log("USER data", data);
  console.log("USER renderdata", renderData);

  return (
    <div>
      <CardContainer data={renderData} />
    </div>
  );
};

export default User;
