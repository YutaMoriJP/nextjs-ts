import React, { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";

const User = (): JSX.Element => {
  const [renderData, setRenderData] = useState(null);
  useLocalStorage(storageKey, data, setRenderData);
  return <div></div>;
};

export default User;
