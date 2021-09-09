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
      <button onClick={() => setCount(c => c + 1)}>increment</button>
    </>
  );
};

export default Counter;
