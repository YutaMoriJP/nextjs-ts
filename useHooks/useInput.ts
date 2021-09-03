import { useState } from "react";

const useInput = (initial: string = "") => {
  const [value, setValue] = useState(initial);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);
  const reset = () => setValue(initial);
  return [{ value, onChange }, reset] as const;
};

export default useInput;
