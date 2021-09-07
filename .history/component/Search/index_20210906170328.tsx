import React, { useState } from "react";
import Input from "../Input";
import { BlogProps } from "../../pages/users/index";
import { useRouter, NextRouter } from "next/router";
import style from "./style.module.css";

const Search = ({ data }: BlogProps): JSX.Element => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [{ loading, notFound, result }, setResult] = useState({
    loading: false,
    notFound: false,
    result: [],
  });
  const router: NextRouter = useRouter();

  const userNames = data.map(({ name }) => name);
  console.log("userNames", userNames);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setResult(prevResult => ({
      ...prevResult,
      notFound: false,
      loading: true,
    }));
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
    const searchedName = result.length && result[0].item;
    //find slug by checking if searchedName === data.name and return id
    //if something is found then Data interface object is returned, which contains the id
    //which is also the slug for /users/[id]
    const { id } = data.find(({ name }): boolean => name === searchedName) || {
      id: null,
    };
    setResult({ loading: false, result, notFound: result.length === 0 });
    //this cleans up input field
    setHasSubmitted(prev => !prev);
    if (id) {
      alert("FOUND");
      router.push(`/users/${id}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="Search User"
          hasSubmitted={hasSubmitted}
          placeholder="Search User..."
          aria-describedby="resultError"
        />
      </form>
      {notFound && (
        <p id="resultError" className={style.error}>
          Not found...
        </p>
      )}
      {loading && <p>LOADING...</p>}
    </>
  );
};

export default Search;
