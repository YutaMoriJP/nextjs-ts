import React, { useState } from "react";
import Input from "../Input";
import { BlogProps } from "../../pages/users/index";
import { useRouter } from "next/router";

const Search = ({ data }: BlogProps): JSX.Element => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [{ loading, result }, setResult] = useState({
    loading: false,
    result: [],
  });
  const router = useRouter();
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

    //run fuse.search with the input value
    const result = fuseInstance.search(value);
    //get the first name that was found by fuse.search
    const searchedName = result[0].item;
    //find slug by checking if searchedName === data.name and return id
    //if something is found then Data interface object is returned, which contains the id
    //which is also the slug for /blog/[id]
    const { id } = data.find(({ name }) => name === searchedName);
    setResult({ loading: false, result });

    console.log("result", result);
    console.log("searchedName", searchedName);

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
