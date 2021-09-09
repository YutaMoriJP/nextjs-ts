import { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";
import { deserialize } from "../../useHooks/useLocalStorage";

const Counter = () => {
  const [count, setCount] = useState(() => {
    return Array.from({ length: 500 }, (_, index) => index + 1);
  });
  const [key, setKey] = useState("key");
  useLocalStorage(key, count);
  console.log("count", count);
  return (
    <>
      <input
        type="text"
        onChange={event => setKey(event.currentTarget.value)}
      />
      <button
        onClick={() =>
          setCount(prevCounts => [
            ...prevCounts,
            prevCounts[prevCounts.length - 1] + 1,
          ])
        }
      >
        increment
      </button>
    </>
  );
};

export default Counter;
