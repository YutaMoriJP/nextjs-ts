import React, { useState } from "react";
import Input from "../Input";

const Search = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {" "}
        <Input type="text" name="name" hasSubmitted={hasSubmitted} />
      </form>
    </>
  );
};

export default Search;
