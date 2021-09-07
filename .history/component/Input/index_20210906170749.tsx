import { useEffect } from "react";
import useInput from "../../useHooks/useInput";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  hasSubmitted: boolean;
  [x: string]: any;
}

const Input = ({
  name,
  type = "text",
  placeholder = "Type...",
  hasSubmitted,
  ...rest
}: InputProps): JSX.Element => {
  const [inputProps, reset] = useInput("");

  useEffect((): void => {
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
        {...rest}
      />
    </>
  );
};

export default Input;
