import React, { useReducer, useState } from "react";
import Input from "../Input";

const names = ["Tim", "Joe", "Bel", "Max", "Lee"];

type SearchResult = {
  item: string;
  refIndex: number;
  score: number;
};

const Search = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [{ loading, result }, setResult] = useState<{
    loading: boolean;
    result: SearchResult[] | [];
  }>({
    loading: false,
    result: [],
  });

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
    const fuseInstance = new Fuse(names);
    const result = fuseInstance.search(value);
    setResult({ loading: false, result });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" hasSubmitted={hasSubmitted} />
      </form>

      {loading && <p>LOADING...</p>}

      {JSON.stringify(result)}
    </>
  );
};

export default Search;
