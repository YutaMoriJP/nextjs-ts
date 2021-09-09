import React, { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";

const storageKey = "netlify_identity_user_data";

const User = ({ data }): JSX.Element => {
  const [renderData, setRenderData] = useState(null);
  useLocalStorage(storageKey, data, setRenderData);
  return <div></div>;
};

export default User;
