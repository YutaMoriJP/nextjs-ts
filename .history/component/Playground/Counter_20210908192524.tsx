import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [key, setKey] = useState("key");
  return (
    <>
      <input
        type="text"
        onChange={event => setKey(event.currentTarget.value)}
      />
    </>
  );
};

export default Counter;
