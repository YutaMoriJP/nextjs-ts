import useInput from "../../useHooks/useInput";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
}

const Input = ({
  name,
  type = "text",
  placeholder = "Type...",
}: InputProps) => {
  const [inputProps, reset] = useInput("");
  return (
    <>
      <label htmlFor={name}>{name}</label>
      <input type={type} id={name} {...inputProps} placeholder={placeholder} />
    </>
  );
};

export default Input;
