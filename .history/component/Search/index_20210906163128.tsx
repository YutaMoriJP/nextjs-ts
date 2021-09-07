import React, { useReducer, useState } from "react";
import Input from "../Input";

const names = ["Tim", "Joe", "Bel", "Max", "Lee"];

const Search = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [{ loading, result }, setResult] = useState({
    loading: false,
    result: "",
  });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setResult(prevResult => ({ ...prevResult, loading: true }));
    //obtain form data as an object literal
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    //convert object in an array with elements as [ {name: value} ]
    const [value] = Object.entries(formData).map(
      ([_, value]): FormDataEntryValue => value
    );
    //dynamically import module
    const Fuse = (await import("fuse.js")).default;
    const fuseInstance = new Fuse(names);
    setResult(prevResult => ({
      ...prevResult,
      result: fuseInstance.search(value),
    }));
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
