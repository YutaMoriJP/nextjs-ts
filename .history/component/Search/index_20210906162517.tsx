import React, { useState } from "react";
import Input from "../Input";

const names = ["Tim", "Joe", "Bel", "Max", "Lee"];

const Search = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    //obtain form data as an object literal
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    //convert object in an array with elements as [ {name: value} ]
    const searchedData = Object.entries(formData).map(
      ([name, value]: [string, FormDataEntryValue]) => ({ [name]: value })
    );
    //dynamically import module
    const Fuse = (await import("fuse.js")).default;
    const fuseInstance = new Fuse();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" hasSubmitted={hasSubmitted} />
      </form>
    </>
  );
};

export default Search;
