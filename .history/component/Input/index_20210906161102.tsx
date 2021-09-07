import { useEffect } from "react";
import useInput from "../../useHooks/useInput";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  hasSubmitted: false;
}

const Input = ({
  name,
  type = "text",
  placeholder = "Type...",
  hasSubmitted,
}: InputProps) => {
  const [inputProps, reset] = useInput("");

  useEffect(() => {
    reset();
  }, [hasSubmitted]);
  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input type={type} id={name} {...inputProps} placeholder={placeholder} />
    </>
  );
};

export default Input;
