import React, { useState } from "react";
import Input from "../Input";

const Search = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchedData = Object.entries(Object.fromEntries(formData)).map(
      ([name, value]: [string, FormDataEntryValue]) => ({ [name]: value })
    );
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
