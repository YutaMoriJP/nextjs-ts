import React, { useState } from "react";
import Input from "../Input";

const Search = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  return (
    <>
      <form action="">
        {" "}
        <Input type="text" name="name" hasSubmitted={hasSubmitted} />
      </form>
    </>
  );
};

export default Search;
