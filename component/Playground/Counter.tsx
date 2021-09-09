import { useState } from "react";
import useLocalStorage from "../../useHooks/useLocalStorage";

const localStorageKey = "key";

const Counter = () => {
  console.log("Counter is rendered");
  const [count, setCount] = useState([]);
  const initialCountSetter = (data: any) => {
    setCount(data);
  };
  const [key, setKey] = useState(localStorageKey);

  const { remove } = useLocalStorage(key, count, initialCountSetter);

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
      <button onClick={remove}>remove</button>
    </>
  );
};

export default Counter;
