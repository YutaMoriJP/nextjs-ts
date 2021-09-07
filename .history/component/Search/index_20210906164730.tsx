import React, { useState } from "react";
import Input from "../Input";
import { BlogProps } from "../../pages/users/index";

const Search = ({ data }: BlogProps): JSX.Element => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [{ loading, result }, setResult] = useState({
    loading: false,
    result: [],
  });

  const userNames = data.map(({ name }) => name);
  console.log("userNames", userNames);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setResult(prevResult => ({ ...prevResult, loading: true }));
    //obtain form data as an object literal
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    //tell TypeScript that return value is string with as string[]
    const [value] = Object.entries(formData).map(
      ([_, value]): FormDataEntryValue => value
    ) as string[];

    //dynamically import module
    const Fuse = (await import("fuse.js")).default;
    const fuseInstance = new Fuse(userNames);

    const result = fuseInstance.search(value);
    const searchedName = result;

    setResult({ loading: false, result });

    console.log("result", result);
    //this cleans up input field
    setHasSubmitted(prev => !prev);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" hasSubmitted={hasSubmitted} />
      </form>

      {loading && <p>LOADING...</p>}
    </>
  );
};

export default Search;
