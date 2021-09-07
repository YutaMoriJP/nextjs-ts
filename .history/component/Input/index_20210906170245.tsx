import { useEffect } from "react";
import useInput from "../../useHooks/useInput";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  hasSubmitted: boolean;
}

const Input = ({
  name,
  type = "text",
  placeholder = "Type...",
  hasSubmitted,
  ...rest
}: InputProps): JSX.Element => {
  const [inputProps, reset] = useInput("");

  useEffect(() => {
    reset();
  }, [hasSubmitted]);
  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        {...inputProps}
      />
    </>
  );
};

export default Input;
