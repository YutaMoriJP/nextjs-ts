import { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";
import { deserialize } from "../../util/localStorage";

const localStorageKey = "key";

const Counter = () => {
  const [count, setCount] = useState([]);

  const [key, setKey] = useState(localStorageKey);

  const { remove, data } = useLocalStorage(key, count);
  console.log("count", count);
  console.log("data", data);

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
      <button onClick={remove}>remove</button>
    </>
  );
};

export default Counter;
