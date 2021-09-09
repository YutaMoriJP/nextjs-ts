import { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";

const Counter = () => {
  const [count, setCount] = useState(() => {
    return Array.from({ length: 500 }, (_, index) => index + 1);
  });
  const [key, setKey] = useState("key");
  useLocalStorage(key, count);
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
